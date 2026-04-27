package com.medipredict.backend.dto.ml;

import java.util.List;

public class MlPredictionApiResponse {
    private boolean success;
    private Number prediction;
    private List<Double> probabilities;
    private Double processingTimeMs;
    private String modelVersion;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Number getPrediction() {
        return prediction;
    }

    public void setPrediction(Number prediction) {
        this.prediction = prediction;
    }

    public List<Double> getProbabilities() {
        return probabilities;
    }

    public void setProbabilities(List<Double> probabilities) {
        this.probabilities = probabilities;
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
}
