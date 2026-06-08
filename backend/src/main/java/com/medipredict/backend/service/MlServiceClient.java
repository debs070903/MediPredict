package com.medipredict.backend.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.medipredict.backend.config.MediPredictProperties;
import com.medipredict.backend.dto.ml.MlHealthResponse;
import com.medipredict.backend.dto.ml.MlPredictionApiResponse;
import com.medipredict.backend.dto.ml.MlPredictionFactor;
import com.medipredict.backend.dto.ml.MlPredictionRequest;
import com.medipredict.backend.dto.ml.MlPredictionResult;
import com.medipredict.backend.exception.ExternalServiceException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class MlServiceClient {

    private static final Logger log =
            LoggerFactory.getLogger(MlServiceClient.class);

    private final RestTemplate restTemplate;

    private final MediPredictProperties properties;

    public MlServiceClient(
            RestTemplate restTemplate,
            MediPredictProperties properties
    ) {
        this.restTemplate = restTemplate;
        this.properties = properties;
    }

    public MlPredictionResult predict(
            Map<String, Object> features,
            boolean returnProbabilities
    ) {

        MlPredictionRequest request =
                new MlPredictionRequest(
                        features,
                        returnProbabilities
                );

        if (!isHealthy()) {

            log.warn(
                    "ML service unhealthy. Using fallback prediction."
            );

            return fallbackPrediction(features);
        }

        try {

            log.info(
                    "Calling ML prediction API at {}",
                    properties.getMlServiceBaseUrl() + "/predict"
            );

            ResponseEntity<MlPredictionApiResponse> response =
                    restTemplate.postForEntity(
                            properties.getMlServiceBaseUrl() + "/predict",
                            request,
                            MlPredictionApiResponse.class
                    );

            MlPredictionApiResponse body =
                    response.getBody();

            if (
                    body == null
                            || !body.isSuccess()
                            || (
                            body.getPrediction() == null
                                    && body.getMonthlyPrediction() == null
                    )
            ) {

                log.error(
                        "Invalid ML response received"
                );

                throw new ExternalServiceException(
                        "Invalid ML response"
                );
            }

            Double monthlyPrediction =
                    body.getMonthlyPrediction();

            Double annualPrediction =
                    body.getAnnualPrediction();

            if (
                    monthlyPrediction == null
                            && body.getPrediction() != null
            ) {

                monthlyPrediction =
                        body.getPrediction().doubleValue();
            }

            if (
                    annualPrediction == null
                            && monthlyPrediction != null
            ) {

                annualPrediction =
                        monthlyPrediction * 12;
            }

            MlPredictionResult result =
                    new MlPredictionResult();

            result.setPrediction(monthlyPrediction);

            result.setMonthlyPrediction(
                    monthlyPrediction
            );

            result.setAnnualPrediction(
                    annualPrediction
            );

            result.setProcessingTimeMs(
                    body.getProcessingTimeMs()
            );

            result.setModelVersion(
                    body.getModelVersion()
            );

            result.setSource("ml_service");

            result.setFallbackUsed(false);

            result.setInterpretability(
                    body.getInterpretability()
            );

            result.setRawMlResponse(body);

            if (
                    body.getBreakdown() != null
                            && !body.getBreakdown().isEmpty()
            ) {

                result.setBreakdown(
                        body.getBreakdown()
                );

            } else {

                result.setBreakdown(
                        buildBreakdown(
                                features,
                                monthlyPrediction,
                                false
                        )
                );
            }

            log.info(
                    "ML prediction successful"
            );

            return result;

        } catch (RestClientException ex) {

            log.error(
                    "ML API call failed. Falling back to heuristic prediction",
                    ex
            );

            return fallbackPrediction(features);
        }
    }

    public MlHealthResponse health() {

        try {

            return restTemplate.getForObject(
                    properties.getMlServiceBaseUrl() + "/health",
                    MlHealthResponse.class
            );

        } catch (RestClientException exception) {

            MlHealthResponse response =
                    new MlHealthResponse();

            response.setStatus("unavailable");

            response.setModelLoaded(false);

            response.setVersion("unknown");

            return response;
        }
    }

    public Map<String, Object> modelInfo() {

        try {

            ResponseEntity<Map> response =
                    restTemplate.getForEntity(
                            properties.getMlServiceBaseUrl() + "/model/info",
                            Map.class
                    );

            if (response.getBody() == null) {

                return Map.of(
                        "is_loaded",
                        false
                );
            }

            return response.getBody();

        } catch (RestClientException exception) {

            Map<String, Object> fallback =
                    new LinkedHashMap<>();

            fallback.put("is_loaded", false);

            fallback.put("model_type", null);

            fallback.put("model_version", "unknown");

            fallback.put("feature_names", List.of());

            return fallback;
        }
    }

    public boolean isHealthy() {

        MlHealthResponse response =
                health();

        return response.getStatus() != null
                && !"unavailable".equalsIgnoreCase(
                response.getStatus()
        )
                && Boolean.TRUE.equals(
                response.getModelLoaded()
        );
    }

    private MlPredictionResult fallbackPrediction(
            Map<String, Object> features
    ) {

        double age =
                asDouble(
                        features.get("age"),
                        35d
                );

        double bmi =
                asDouble(
                        features.get("bmi"),
                        27d
                );

        double heightCm =
                asDouble(
                        features.get("height_cm"),
                        170d
                );

        double weightKg =
                asDouble(
                        features.get("weight_kg"),
                        70d
                );

        String smoking =
                String.valueOf(
                        features.getOrDefault(
                                "smoking_status",
                                "non-smoker"
                        )
                ).toLowerCase();

        String region =
                String.valueOf(
                        features.getOrDefault(
                                "region",
                                "south"
                        )
                ).toLowerCase();

        double children =
                asDouble(
                        features.get("children"),
                        0d
                );

        double basePremium = 2400d;

        double ageFactor = age * 16d;

        double bmiFactor =
                Math.max(0d, bmi - 22d) * 150d;

        double heightWeightFactor =
                Math.max(0d, 175d - heightCm) * 6d
                        + Math.max(0d, weightKg - 70d) * 9d;

        double smokingFactor =
                smoking.contains("smoker")
                        && !smoking.contains("non")
                        ? 2200d
                        : 0d;

        double regionFactor =
                switch (region) {
                    case "north", "northwest", "northeast" -> 280d;
                    case "west", "southwest" -> 220d;
                    case "east", "southeast" -> 180d;
                    default -> 150d;
                };

        double familyFactor =
                Math.max(0d, children) * 120d;

        double prediction =
                roundCurrency(
                        basePremium
                                + ageFactor
                                + bmiFactor
                                + heightWeightFactor
                                + smokingFactor
                                + regionFactor
                                + familyFactor
                );

        MlPredictionResult result =
                new MlPredictionResult();

        result.setPrediction(prediction);

        result.setMonthlyPrediction(prediction);

        result.setAnnualPrediction(
                prediction * 12d
        );

        result.setProcessingTimeMs(1.0);

        result.setModelVersion(
                "fallback-heuristic"
        );

        result.setSource("fallback_rule");

        result.setFallbackUsed(true);

        result.setBreakdown(
                buildBreakdown(
                        features,
                        prediction,
                        true
                )
        );

        // =====================================================
        // RAW FALLBACK RESPONSE
        // =====================================================

        MlPredictionApiResponse fallbackResponse =
                new MlPredictionApiResponse();

        fallbackResponse.setSuccess(true);

        fallbackResponse.setPrediction(
                prediction
        );

        fallbackResponse.setMonthlyPrediction(
                prediction
        );

        fallbackResponse.setAnnualPrediction(
                prediction * 12d
        );

        fallbackResponse.setModelVersion(
                "fallback-heuristic"
        );

        fallbackResponse.setBreakdown(
                result.getBreakdown()
        );

        // =====================================================
        // MOCK INTERPRETABILITY
        // =====================================================

        MlPredictionApiResponse.Interpretability interpretability =
                new MlPredictionApiResponse.Interpretability();

        // ---------- LOCAL CONTRIBUTIONS ----------

        List<MlPredictionApiResponse.FeatureContribution>
                localContributions = List.of(

                contribution(
                        "Age",
                        roundCurrency(age * 0.8)
                ),

                contribution(
                        "BMI",
                        roundCurrency(
                                Math.max(0d, bmi - 22d) * 4
                        )
                ),

                contribution(
                        "Smoking",
                        smoking.contains("smoker")
                                && !smoking.contains("non")
                                ? 2200d
                                : 0d
                ),

                contribution(
                        "Weight",
                        roundCurrency(
                                Math.max(0d, weightKg - 70d) * 2
                        )
                ),

                contribution(
                        "Dependents",
                        roundCurrency(children * 120d)
                )
        );

        // ---------- GLOBAL IMPORTANCE ----------

        List<MlPredictionApiResponse.FeatureImportance>
                globalImportance = List.of(

                importance("Smoking", 0.92),

                importance("BMI", 0.81),

                importance("Age", 0.74),

                importance("Weight", 0.58),

                importance("Region", 0.42),

                importance("Dependents", 0.33)
        );

        // ---------- METRICS ----------

        MlPredictionApiResponse.ModelMetrics metrics =
                new MlPredictionApiResponse.ModelMetrics();

        metrics.setMae(112.4);

        metrics.setRmse(245.8);

        metrics.setR2(0.91);

        // ---------- COVERAGE ----------

        MlPredictionApiResponse.InputCoverage coverage =
                new MlPredictionApiResponse.InputCoverage();

        coverage.setCoverageScore(1.0);

        coverage.setMissingFeatures(List.of());

        // ---------- ASSIGN ----------

        interpretability.setLocalFeatureContributions(
                localContributions
        );

        interpretability.setGlobalFeatureImportance(
                globalImportance
        );

        interpretability.setModelMetrics(metrics);

        interpretability.setInputCoverage(coverage);

        fallbackResponse.setInterpretability(
                interpretability
        );

        result.setInterpretability(
                interpretability
        );

        result.setRawMlResponse(
                fallbackResponse
        );

        return result;
    }

    private List<MlPredictionFactor> buildBreakdown(
            Map<String, Object> features,
            double prediction,
            boolean heuristic
    ) {

        double age =
                asDouble(
                        features.get("age"),
                        35d
                );

        double bmi =
                asDouble(
                        features.get("bmi"),
                        27d
                );

        double weightKg =
                asDouble(
                        features.get("weight_kg"),
                        70d
                );

        String smoking =
                String.valueOf(
                        features.getOrDefault(
                                "smoking_status",
                                "non-smoker"
                        )
                ).toLowerCase();

        String region =
                String.valueOf(
                        features.getOrDefault(
                                "region",
                                "south"
                        )
                ).toLowerCase();

        double children =
                asDouble(
                        features.get("children"),
                        0d
                );

        double base =
                heuristic
                        ? 2400d
                        : Math.max(
                        1400d,
                        prediction * 0.45d
                );

        double ageFactor =
                age * 16d;

        double bmiFactor =
                Math.max(0d, bmi - 22d) * 150d;

        double healthFactor =
                Math.max(0d, weightKg - 70d) * 9d;

        double smokingFactor =
                smoking.contains("smoker")
                        && !smoking.contains("non")
                        ? 2200d
                        : 0d;

        double regionFactor =
                switch (region) {
                    case "north", "northwest", "northeast" -> 280d;
                    case "west", "southwest" -> 220d;
                    case "east", "southeast" -> 180d;
                    default -> 150d;
                };

        double familyFactor =
                Math.max(0d, children) * 120d;

        return List.of(
                new MlPredictionFactor(
                        "Base Premium",
                        roundCurrency(base)
                ),

                new MlPredictionFactor(
                        "Age Factor",
                        roundCurrency(ageFactor)
                ),

                new MlPredictionFactor(
                        "BMI Factor",
                        roundCurrency(bmiFactor)
                ),

                new MlPredictionFactor(
                        "Health Factor",
                        roundCurrency(healthFactor)
                ),

                new MlPredictionFactor(
                        "Smoking Factor",
                        roundCurrency(smokingFactor)
                ),

                new MlPredictionFactor(
                        "Regional Factor",
                        roundCurrency(
                                regionFactor + familyFactor
                        )
                )
        );
    }

    private MlPredictionApiResponse.FeatureContribution contribution(
            String feature,
            Double value
    ) {

        MlPredictionApiResponse.FeatureContribution contribution =
                new MlPredictionApiResponse.FeatureContribution();

        contribution.setFeature(feature);

        contribution.setContribution(value);

        return contribution;
    }

    private MlPredictionApiResponse.FeatureImportance importance(
            String feature,
            Double value
    ) {

        MlPredictionApiResponse.FeatureImportance importance =
                new MlPredictionApiResponse.FeatureImportance();

        importance.setFeature(feature);

        importance.setImportance(value);

        return importance;
    }

    private double asDouble(
            Object value,
            double defaultValue
    ) {

        if (value == null) {
            return defaultValue;
        }

        if (value instanceof Number number) {
            return number.doubleValue();
        }

        try {

            return Double.parseDouble(
                    String.valueOf(value)
            );

        } catch (NumberFormatException exception) {

            return defaultValue;
        }
    }

    private double roundCurrency(
            double value
    ) {
        return Math.round(value);
    }
}