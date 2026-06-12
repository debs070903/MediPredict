package com.medipredict.backend.service;

import java.time.Instant;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import com.medipredict.backend.dto.ml.MlPredictionApiResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medipredict.backend.config.MediPredictProperties;
import com.medipredict.backend.domain.PredictionRecord;
import com.medipredict.backend.domain.User;
import com.medipredict.backend.dto.dashboard.DashboardSummaryResponse;
import com.medipredict.backend.dto.prediction.MonthlyTrendPoint;
import com.medipredict.backend.dto.prediction.PredictionFactor;
import com.medipredict.backend.dto.prediction.PredictionHistoryItem;
import com.medipredict.backend.dto.prediction.PredictionRequest;
import com.medipredict.backend.dto.prediction.PredictionResponse;
import com.medipredict.backend.dto.ml.MlPredictionResult;
import com.medipredict.backend.exception.NotFoundException;
import com.medipredict.backend.repository.PredictionRepository;
import com.medipredict.backend.service.MlServiceClient;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PredictionService {

    private final PredictionRepository predictionRepository;
    private final MlServiceClient mlServiceClient;
    private final MediPredictProperties properties;
    private final ObjectMapper objectMapper;

    public PredictionService(
            PredictionRepository predictionRepository,
            MlServiceClient mlServiceClient,
            MediPredictProperties properties,
            ObjectMapper objectMapper
    ) {
        this.predictionRepository = predictionRepository;
        this.mlServiceClient = mlServiceClient;
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public PredictionResponse createPrediction(User user, PredictionRequest request) {
        double bmi = request.getBmi() != null ? request.getBmi() : calculateBmi(request.getHeightCm(), request.getWeightKg());
        Map<String, Object> features = buildFeatureMap(request, bmi);

        MlPredictionResult mlResult = mlServiceClient.predict(features, false);

        try {
            System.out.println(
                    "ML RESULT = " +
                            objectMapper.writeValueAsString(mlResult)
            );

            System.out.println(
                    "RAW ML RESPONSE = " +
                            objectMapper.writeValueAsString(
                                    mlResult.getRawMlResponse()
                            )
            );

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        PredictionRecord record = new PredictionRecord();
        record.setUser(user);
        record.setAge(request.getAge());
        record.setGender(request.getGender());
        record.setHeightCm(request.getHeightCm());
        record.setWeightKg(request.getWeightKg());
        record.setBmi(bmi);
        record.setSmokingStatus(request.getSmokingStatus());
        record.setRegion(request.getRegion());
        record.setChildren(request.getChildren());
        record.setMonthlyPremium(mlResult.getMonthlyPrediction());
        record.setAnnualPremium(mlResult.getAnnualPrediction());
        record.setProcessingTimeMs(mlResult.getProcessingTimeMs() != null ? mlResult.getProcessingTimeMs() : 0d);
        record.setPredictionSource(mlResult.getSource());
        record.setFallbackUsed(mlResult.isFallbackUsed());
        record.setMlModelVersion(mlResult.getModelVersion());
        record.setRequestFeaturesJson(toJson(features));
        record.setResponseJson(
                toJson(
                        mlResult.getRawMlResponse()
                )
        );

        predictionRepository.save(record);

        PredictionResponse response = new PredictionResponse();
        response.setId(record.getId());
        response.setSuccess(true);
        response.setMonthlyPremium(record.getMonthlyPremium());
        response.setAnnualPremium(record.getAnnualPremium());
        response.setProcessingTimeMs(record.getProcessingTimeMs());
        response.setPredictionSource(record.getPredictionSource());
        response.setFallbackUsed(record.isFallbackUsed());
        response.setMlModelVersion(record.getMlModelVersion());
        response.setCreatedAt(record.getCreatedAt());
        response.setFeatures(features);
        response.setBreakdown(mlResult.getBreakdown().stream()
                .map(factor -> new PredictionFactor(factor.getName(), factor.getValue()))
                .toList());
        response.setMlResponse(
                mlResult.getRawMlResponse()
        );
        return response;
    }

    public List<PredictionHistoryItem> getHistory(User user) {
        return predictionRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toHistoryItem)
                .toList();
    }

    public DashboardSummaryResponse getDashboardSummary(User user) {
        List<PredictionRecord> records = predictionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        DashboardSummaryResponse response = new DashboardSummaryResponse();
        response.setTotalPredictions(records.size());
        response.setAverageMonthlyPremium(records.stream()
                .mapToDouble(PredictionRecord::getMonthlyPremium)
                .average()
                .orElse(0d));
        response.setLatestPrediction(records.isEmpty() ? null : toResponse(records.get(0)));
        response.setRecentPredictions(records.stream().limit(8).map(this::toHistoryItem).toList());
        response.setMonthlyTrend(buildMonthlyTrend(records));
        response.setMlServiceHealthy(mlServiceClient.isHealthy());
        response.setMlModelVersion(String.valueOf(mlServiceClient.modelInfo().getOrDefault("model_version", "unknown")));
        return response;
    }

    public PredictionResponse getLatestPrediction(User user) {
        PredictionRecord record = predictionRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(() -> new NotFoundException("No predictions found for this user"));
        return toResponse(record);
    }

    public PredictionResponse getPredictionById(
            User user,
            Long id
    ) {

        PredictionRecord record =
                predictionRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Prediction not found"
                                ));

        if (!record.getUser().getId().equals(user.getId())) {
            throw new NotFoundException(
                    "Prediction not found"
            );
        }

        return toResponse(record);
    }

    private PredictionHistoryItem toHistoryItem(PredictionRecord record) {
        PredictionHistoryItem item = new PredictionHistoryItem();
        item.setId(record.getId());
        item.setCreatedAt(record.getCreatedAt());
        item.setMonthlyPremium(record.getMonthlyPremium());
        item.setAnnualPremium(record.getAnnualPremium());
        item.setRegion(record.getRegion());
        item.setSmokingStatus(record.getSmokingStatus());
        item.setBmi(record.getBmi());
        item.setPredictionSource(record.getPredictionSource());
        return item;
    }

    private PredictionResponse toResponse(PredictionRecord record) {
        PredictionResponse response = new PredictionResponse();
        response.setId(record.getId());
        response.setSuccess(true);
        response.setMonthlyPremium(record.getMonthlyPremium());
        response.setAnnualPremium(record.getAnnualPremium());
        response.setProcessingTimeMs(record.getProcessingTimeMs());
        response.setPredictionSource(record.getPredictionSource());
        response.setFallbackUsed(record.isFallbackUsed());
        response.setMlModelVersion(record.getMlModelVersion());
        response.setCreatedAt(record.getCreatedAt());
        response.setFeatures(Map.of(
                "age", record.getAge(),
                "gender", record.getGender(),
                "height_cm", record.getHeightCm(),
                "weight_kg", record.getWeightKg(),
                "bmi", record.getBmi(),
                "smoking_status", record.getSmokingStatus(),
                "region", record.getRegion(),
                "children", record.getChildren()
        ));
        try {

            MlPredictionApiResponse mlResponse =
                    objectMapper.readValue(
                            record.getResponseJson(),
                            MlPredictionApiResponse.class
                    );

            response.setMlResponse(mlResponse);

            if (mlResponse.getBreakdown() != null) {

                response.setBreakdown(
                        mlResponse.getBreakdown().stream()
                                .map(factor ->
                                        new PredictionFactor(
                                                factor.getName(),
                                                factor.getValue()
                                        )
                                )
                                .toList()
                );
            }

        } catch (Exception ignored) {

        }
        return response;
    }

    private List<MonthlyTrendPoint> buildMonthlyTrend(List<PredictionRecord> records) {
        Map<YearMonth, List<PredictionRecord>> grouped = new LinkedHashMap<>();
        for (PredictionRecord record : records) {
            YearMonth month = YearMonth.from(record.getCreatedAt().atZone(java.time.ZoneId.systemDefault()));
            grouped.computeIfAbsent(month, ignored -> new ArrayList<>()).add(record);
        }

        List<MonthlyTrendPoint> trend = new ArrayList<>();
        grouped.entrySet().stream()
                .sorted(Map.Entry.<YearMonth, List<PredictionRecord>>comparingByKey().reversed())
                .limit(6)
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> {
                    double average = entry.getValue().stream().mapToDouble(PredictionRecord::getMonthlyPremium).average().orElse(0d);
                    trend.add(new MonthlyTrendPoint(entry.getKey().format(DateTimeFormatter.ofPattern("MMM")), average));
                });
        return trend;
    }

    private Map<String, Object> buildFeatureMap(PredictionRequest request, double bmi) {

        Map<String, Object> features = new LinkedHashMap<>();

        // ================= BASIC =================

        features.put("age", request.getAge());

        features.put("gender", request.getGender());

        features.put("height_cm", request.getHeightCm());

        features.put("weight_kg", request.getWeightKg());

        features.put("bmi", bmi);

        features.put("smoking_status", request.getSmokingStatus());

        features.put("region", request.getRegion());

        features.put(
                "children",
                request.getChildren() == null ? 0 : request.getChildren()
        );

        // ================= LIFESTYLE =================

        features.put(
                "alcohol_freq",
                request.getAlcoholFreq() == null ? "never" : request.getAlcoholFreq()
        );

        features.put(
                "urban_rural",
                request.getUrbanRural() == null ? "urban" : request.getUrbanRural()
        );

        features.put(
                "household_size",
                request.getHouseholdSize() == null ? 0 : request.getHouseholdSize()
        );

        features.put(
                "income",
                request.getIncome() == null ? 0d : request.getIncome()
        );

        features.put(
                "employment_status",
                request.getEmploymentStatus() == null
                        ? "unknown"
                        : request.getEmploymentStatus()
        );

        // ================= HEALTHCARE USAGE =================

        features.put(
                "visits_last_year",
                request.getVisitsLastYear() == null ? 0 : request.getVisitsLastYear()
        );

        features.put(
                "hospitalizations_last_3yrs",
                request.getHospitalizationsLast3Yrs() == null
                        ? 0
                        : request.getHospitalizationsLast3Yrs()
        );

        features.put(
                "days_hospitalized_last_3yrs",
                request.getDaysHospitalizedLast3Yrs() == null
                        ? 0
                        : request.getDaysHospitalizedLast3Yrs()
        );

        features.put(
                "medication_count",
                request.getMedicationCount() == null ? 0 : request.getMedicationCount()
        );

        // ================= MEDICAL CONDITIONS =================

        features.put(
                "hypertension",
                Boolean.TRUE.equals(request.getHypertension()) ? 1 : 0
        );

        features.put(
                "diabetes",
                Boolean.TRUE.equals(request.getDiabetes()) ? 1 : 0
        );

        features.put(
                "asthma",
                Boolean.TRUE.equals(request.getAsthma()) ? 1 : 0
        );

        features.put(
                "copd",
                Boolean.TRUE.equals(request.getCopd()) ? 1 : 0
        );

        features.put(
                "cardiovascular_disease",
                Boolean.TRUE.equals(request.getCardiovascularDisease()) ? 1 : 0
        );

        features.put(
                "cancer_history",
                Boolean.TRUE.equals(request.getCancerHistory()) ? 1 : 0
        );

        features.put(
                "kidney_disease",
                Boolean.TRUE.equals(request.getKidneyDisease()) ? 1 : 0
        );

        features.put(
                "liver_disease",
                Boolean.TRUE.equals(request.getLiverDisease()) ? 1 : 0
        );

        features.put(
                "arthritis",
                Boolean.TRUE.equals(request.getArthritis()) ? 1 : 0
        );

        features.put(
                "mental_health",
                Boolean.TRUE.equals(request.getMentalHealth()) ? 1 : 0
        );

        features.put(
                "chronic_count",
                request.getChronicCount() == null ? 0 : request.getChronicCount()
        );

        features.put(
                "is_high_risk",
                Boolean.TRUE.equals(request.getHighRisk()) ? 1 : 0
        );

        // ================= CLINICAL METRICS =================

        features.put(
                "systolic_bp",
                request.getSystolicBp() == null ? 0d : request.getSystolicBp()
        );

        features.put(
                "diastolic_bp",
                request.getDiastolicBp() == null ? 0d : request.getDiastolicBp()
        );

        features.put(
                "ldl",
                request.getLdl() == null ? 0d : request.getLdl()
        );

        features.put(
                "hba1c",
                request.getHba1c() == null ? 0d : request.getHba1c()
        );

        // ================= PROCEDURE HISTORY =================

        features.put(
                "had_major_procedure",
                Boolean.TRUE.equals(request.getHadMajorProcedure()) ? 1 : 0
        );

        features.put(
                "proc_imaging_count",
                request.getProcImagingCount() == null
                        ? 0
                        : request.getProcImagingCount()
        );

        features.put(
                "proc_surgery_count",
                request.getProcSurgeryCount() == null
                        ? 0
                        : request.getProcSurgeryCount()
        );

        features.put(
                "proc_physio_count",
                request.getProcPhysioCount() == null
                        ? 0
                        : request.getProcPhysioCount()
        );

        features.put(
                "proc_consult_count",
                request.getProcConsultCount() == null
                        ? 0
                        : request.getProcConsultCount()
        );

        features.put(
                "proc_lab_count",
                request.getProcLabCount() == null
                        ? 0
                        : request.getProcLabCount()
        );

        // ================= EXTRA =================

        features.put("currency", properties.getCurrency());

        return features;
    }


    private double calculateBmi(Double heightCm, Double weightKg) {
        if (heightCm == null || weightKg == null || heightCm <= 0d) {
            return 0d;
        }
        double meters = heightCm / 100d;
        return Math.round((weightKg / (meters * meters)) * 10d) / 10d;
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException exception) {
            return "{}";
        }
    }
}
