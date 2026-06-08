package com.medipredict.backend.dto.ml;

import java.util.List;

public class MlPredictionResult {

    private double prediction;

    private Double monthlyPrediction;

    private Double annualPrediction;

    private Double processingTimeMs;

    private String modelVersion;

    private String source;

    private boolean fallbackUsed;

    private List<MlPredictionFactor> breakdown;

    private MlPredictionApiResponse.Interpretability interpretability;

    private MlPredictionApiResponse rawMlResponse;

    public double getPrediction() {
        return prediction;
    }

    public void setPrediction(double prediction) {
        this.prediction = prediction;
    }

    public Double getMonthlyPrediction() {
        return monthlyPrediction;
    }

    public void setMonthlyPrediction(Double monthlyPrediction) {
        this.monthlyPrediction = monthlyPrediction;
    }

    public Double getAnnualPrediction() {
        return annualPrediction;
    }

    public void setAnnualPrediction(Double annualPrediction) {
        this.annualPrediction = annualPrediction;
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

    public MlPredictionApiResponse.Interpretability getInterpretability() {
        return interpretability;
    }

    public void setInterpretability(
            MlPredictionApiResponse.Interpretability interpretability
    ) {
        this.interpretability = interpretability;
    }

    public MlPredictionApiResponse getRawMlResponse() {
        return rawMlResponse;
    }

    public void setRawMlResponse(
            MlPredictionApiResponse rawMlResponse
    ) {
        this.rawMlResponse = rawMlResponse;
    }
}