package com.medipredict.backend.dto.ml;

import java.util.Map;

public class MlPredictionRequest {
    private Map<String, Object> features;
    private boolean returnProbabilities;

    public MlPredictionRequest() {
    }

    public MlPredictionRequest(Map<String, Object> features, boolean returnProbabilities) {
        this.features = features;
        this.returnProbabilities = returnProbabilities;
    }

    public Map<String, Object> getFeatures() {
        return features;
    }

    public void setFeatures(Map<String, Object> features) {
        this.features = features;
    }

    public boolean isReturnProbabilities() {
        return returnProbabilities;
    }

    public void setReturnProbabilities(boolean returnProbabilities) {
        this.returnProbabilities = returnProbabilities;
    }
}
