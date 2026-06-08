package com.medipredict.backend.dto.ml;

import java.util.List;
import java.util.Map;

public class MlPredictionApiResponse {

    private boolean success;

    private Number prediction;

    private Double monthlyPrediction;
    private Double annualPrediction;

    private String predictionUnit;
    private String target;

    private List<Double> probabilities;
    private Double processingTimeMs;
    private String modelVersion;

    // NEW
    private List<MlPredictionFactor> breakdown;

    // NEW
    private Interpretability interpretability;

    // ---------- GETTERS & SETTERS ----------

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

    public String getPredictionUnit() {
        return predictionUnit;
    }

    public void setPredictionUnit(String predictionUnit) {
        this.predictionUnit = predictionUnit;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
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

    public List<MlPredictionFactor> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(List<MlPredictionFactor> breakdown) {
        this.breakdown = breakdown;
    }

    public Interpretability getInterpretability() {
        return interpretability;
    }

    public void setInterpretability(Interpretability interpretability) {
        this.interpretability = interpretability;
    }

    // =====================================================
    // INNER CLASSES
    // =====================================================

    public static class Interpretability {

        private List<FeatureContribution> localFeatureContributions;

        private List<FeatureImportance> globalFeatureImportance;

        private ModelMetrics modelMetrics;

        private InputCoverage inputCoverage;

        public List<FeatureContribution> getLocalFeatureContributions() {
            return localFeatureContributions;
        }

        public void setLocalFeatureContributions(List<FeatureContribution> localFeatureContributions) {
            this.localFeatureContributions = localFeatureContributions;
        }

        public List<FeatureImportance> getGlobalFeatureImportance() {
            return globalFeatureImportance;
        }

        public void setGlobalFeatureImportance(List<FeatureImportance> globalFeatureImportance) {
            this.globalFeatureImportance = globalFeatureImportance;
        }

        public ModelMetrics getModelMetrics() {
            return modelMetrics;
        }

        public void setModelMetrics(ModelMetrics modelMetrics) {
            this.modelMetrics = modelMetrics;
        }

        public InputCoverage getInputCoverage() {
            return inputCoverage;
        }

        public void setInputCoverage(InputCoverage inputCoverage) {
            this.inputCoverage = inputCoverage;
        }
    }

    public static class FeatureContribution {

        private String feature;
        private Double contribution;

        public String getFeature() {
            return feature;
        }

        public void setFeature(String feature) {
            this.feature = feature;
        }

        public Double getContribution() {
            return contribution;
        }

        public void setContribution(Double contribution) {
            this.contribution = contribution;
        }
    }

    public static class FeatureImportance {

        private String feature;
        private Double importance;

        public String getFeature() {
            return feature;
        }

        public void setFeature(String feature) {
            this.feature = feature;
        }

        public Double getImportance() {
            return importance;
        }

        public void setImportance(Double importance) {
            this.importance = importance;
        }
    }

    public static class ModelMetrics {

        private Double mae;
        private Double rmse;
        private Double r2;

        public Double getMae() {
            return mae;
        }

        public void setMae(Double mae) {
            this.mae = mae;
        }

        public Double getRmse() {
            return rmse;
        }

        public void setRmse(Double rmse) {
            this.rmse = rmse;
        }

        public Double getR2() {
            return r2;
        }

        public void setR2(Double r2) {
            this.r2 = r2;
        }
    }

    public static class InputCoverage {

        private Double coverageScore;

        private List<String> missingFeatures;

        public Double getCoverageScore() {
            return coverageScore;
        }

        public void setCoverageScore(Double coverageScore) {
            this.coverageScore = coverageScore;
        }

        public List<String> getMissingFeatures() {
            return missingFeatures;
        }

        public void setMissingFeatures(List<String> missingFeatures) {
            this.missingFeatures = missingFeatures;
        }
    }
}