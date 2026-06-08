package com.medipredict.backend.dto.prediction;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import com.medipredict.backend.dto.ml.MlPredictionApiResponse;

public class PredictionResponse {

    private Long id;

    private boolean success;

    private double monthlyPremium;

    private double annualPremium;

    private double processingTimeMs;

    private String predictionSource;

    private boolean fallbackUsed;

    private String mlModelVersion;

    private Instant createdAt;

    private Map<String, Object> features;

    private List<PredictionFactor> breakdown;

    // NEW
    private MlPredictionApiResponse mlResponse;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public double getMonthlyPremium() {
        return monthlyPremium;
    }

    public void setMonthlyPremium(double monthlyPremium) {
        this.monthlyPremium = monthlyPremium;
    }

    public double getAnnualPremium() {
        return annualPremium;
    }

    public void setAnnualPremium(double annualPremium) {
        this.annualPremium = annualPremium;
    }

    public double getProcessingTimeMs() {
        return processingTimeMs;
    }

    public void setProcessingTimeMs(double processingTimeMs) {
        this.processingTimeMs = processingTimeMs;
    }

    public String getPredictionSource() {
        return predictionSource;
    }

    public void setPredictionSource(String predictionSource) {
        this.predictionSource = predictionSource;
    }

    public boolean isFallbackUsed() {
        return fallbackUsed;
    }

    public void setFallbackUsed(boolean fallbackUsed) {
        this.fallbackUsed = fallbackUsed;
    }

    public String getMlModelVersion() {
        return mlModelVersion;
    }

    public void setMlModelVersion(String mlModelVersion) {
        this.mlModelVersion = mlModelVersion;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Map<String, Object> getFeatures() {
        return features;
    }

    public void setFeatures(Map<String, Object> features) {
        this.features = features;
    }

    public List<PredictionFactor> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(List<PredictionFactor> breakdown) {
        this.breakdown = breakdown;
    }

    public MlPredictionApiResponse getMlResponse() {
        return mlResponse;
    }

    public void setMlResponse(MlPredictionApiResponse mlResponse) {
        this.mlResponse = mlResponse;
    }
}