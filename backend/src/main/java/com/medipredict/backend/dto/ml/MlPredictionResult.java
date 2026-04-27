package com.medipredict.backend.dto.ml;

import java.util.List;

public class MlPredictionResult {
    private double prediction;
    private Double processingTimeMs;
    private String modelVersion;
    private String source;
    private boolean fallbackUsed;
    private List<MlPredictionFactor> breakdown;

    public double getPrediction() {
        return prediction;
    }

    public void setPrediction(double prediction) {
        this.prediction = prediction;
    }

    public Double getProcessingTimeMs() {
        return processingTimeMs;
    }

    public void setProcessingTimeMs(Double processingTimeMs) {
        this.processingTimeMs = processingTimeMs;
    }

    public String getModelVersion() {
        return modelVersion;
    }

    public void setModelVersion(String modelVersion) {
        this.modelVersion = modelVersion;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public boolean isFallbackUsed() {
        return fallbackUsed;
    }

    public void setFallbackUsed(boolean fallbackUsed) {
        this.fallbackUsed = fallbackUsed;
    }

    public List<MlPredictionFactor> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(List<MlPredictionFactor> breakdown) {
        this.breakdown = breakdown;
    }
}
