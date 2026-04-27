package com.medipredict.backend.service;

import java.time.Instant;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class MlServiceClient {

    private final RestTemplate restTemplate;
    private final MediPredictProperties properties;

    public MlServiceClient(RestTemplate restTemplate, MediPredictProperties properties) {
        this.restTemplate = restTemplate;
        this.properties = properties;
    }

    public MlPredictionResult predict(Map<String, Object> features, boolean returnProbabilities) {
        MlPredictionRequest request = new MlPredictionRequest(features, returnProbabilities);

        try {
            ResponseEntity<MlPredictionApiResponse> response = restTemplate.postForEntity(
                    properties.getMlServiceBaseUrl() + "/predict",
                    request,
                    MlPredictionApiResponse.class
            );

            MlPredictionApiResponse body = response.getBody();
            if (body == null || !body.isSuccess() || body.getPrediction() == null) {
                return fallbackPrediction(features);
            }

            MlPredictionResult result = new MlPredictionResult();
            result.setPrediction(body.getPrediction().doubleValue());
            result.setProcessingTimeMs(body.getProcessingTimeMs());
            result.setModelVersion(body.getModelVersion());
            result.setSource("ml_service");
            result.setFallbackUsed(false);
            result.setBreakdown(buildBreakdown(features, result.getPrediction(), false));
            return result;
        } catch (RestClientException exception) {
            return fallbackPrediction(features);
        }
    }

    public MlHealthResponse health() {
        try {
            return restTemplate.getForObject(properties.getMlServiceBaseUrl() + "/health", MlHealthResponse.class);
        } catch (RestClientException exception) {
            MlHealthResponse response = new MlHealthResponse();
            response.setStatus("unavailable");
            response.setModelLoaded(false);
            response.setVersion("unknown");
            return response;
        }
    }

    public Map<String, Object> modelInfo() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(
                    properties.getMlServiceBaseUrl() + "/model/info",
                    Map.class
            );
            if (response.getBody() == null) {
                return Map.of("is_loaded", false);
            }
            return response.getBody();
        } catch (RestClientException exception) {
            Map<String, Object> fallback = new LinkedHashMap<>();
            fallback.put("is_loaded", false);
            fallback.put("model_type", null);
            fallback.put("model_version", "unknown");
            fallback.put("feature_names", List.of());
            return fallback;
        }
    }

    public boolean isHealthy() {
        MlHealthResponse response = health();
        return response.getStatus() != null && !"unavailable".equalsIgnoreCase(response.getStatus());
    }

    private MlPredictionResult fallbackPrediction(Map<String, Object> features) {
        double age = asDouble(features.get("age"), 35d);
        double bmi = asDouble(features.get("bmi"), 27d);
        double heightCm = asDouble(features.get("height_cm"), 170d);
        double weightKg = asDouble(features.get("weight_kg"), 70d);
        String smoking = String.valueOf(features.getOrDefault("smoking_status", "non-smoker")).toLowerCase();
        String region = String.valueOf(features.getOrDefault("region", "south")).toLowerCase();
        double children = asDouble(features.get("children"), 0d);

        double basePremium = 2400d;
        double ageFactor = age * 16d;
        double bmiFactor = Math.max(0d, bmi - 22d) * 150d;
        double heightWeightFactor = Math.max(0d, 175d - heightCm) * 6d + Math.max(0d, weightKg - 70d) * 9d;
        double smokingFactor = smoking.contains("smoker") && !smoking.contains("non") ? 2200d : 0d;
        double regionFactor = switch (region) {
            case "north", "northwest", "northeast" -> 280d;
            case "west", "southwest" -> 220d;
            case "east", "southeast" -> 180d;
            default -> 150d;
        };
        double familyFactor = Math.max(0d, children) * 120d;

        double prediction = roundCurrency(
                basePremium + ageFactor + bmiFactor + heightWeightFactor + smokingFactor + regionFactor + familyFactor
        );

        MlPredictionResult result = new MlPredictionResult();
        result.setPrediction(prediction);
        result.setProcessingTimeMs(1.0);
        result.setModelVersion("fallback-heuristic");
        result.setSource("fallback_rule");
        result.setFallbackUsed(true);
        result.setBreakdown(buildBreakdown(features, prediction, true));
        return result;
    }

    private List<MlPredictionFactor> buildBreakdown(Map<String, Object> features, double prediction, boolean heuristic) {
        double age = asDouble(features.get("age"), 35d);
        double bmi = asDouble(features.get("bmi"), 27d);
        double weightKg = asDouble(features.get("weight_kg"), 70d);
        String smoking = String.valueOf(features.getOrDefault("smoking_status", "non-smoker")).toLowerCase();
        String region = String.valueOf(features.getOrDefault("region", "south")).toLowerCase();
        double children = asDouble(features.get("children"), 0d);

        double base = heuristic ? 2400d : Math.max(1400d, prediction * 0.45d);
        double ageFactor = age * 16d;
        double bmiFactor = Math.max(0d, bmi - 22d) * 150d;
        double healthFactor = Math.max(0d, weightKg - 70d) * 9d;
        double smokingFactor = smoking.contains("smoker") && !smoking.contains("non") ? 2200d : 0d;
        double regionFactor = switch (region) {
            case "north", "northwest", "northeast" -> 280d;
            case "west", "southwest" -> 220d;
            case "east", "southeast" -> 180d;
            default -> 150d;
        };
        double familyFactor = Math.max(0d, children) * 120d;

        return List.of(
                new MlPredictionFactor("Base Premium", roundCurrency(base)),
                new MlPredictionFactor("Age Factor", roundCurrency(ageFactor)),
                new MlPredictionFactor("BMI Factor", roundCurrency(bmiFactor)),
                new MlPredictionFactor("Health Factor", roundCurrency(healthFactor)),
                new MlPredictionFactor("Smoking Factor", roundCurrency(smokingFactor)),
                new MlPredictionFactor("Regional Factor", roundCurrency(regionFactor + familyFactor))
        );
    }

    private double asDouble(Object value, double defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Number number) {
            return number.doubleValue();
        }
        try {
            return Double.parseDouble(String.valueOf(value));
        } catch (NumberFormatException exception) {
            return defaultValue;
        }
    }

    private double roundCurrency(double value) {
        return Math.round(value);
    }
}
