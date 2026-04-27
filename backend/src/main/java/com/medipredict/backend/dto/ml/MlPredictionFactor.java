package com.medipredict.backend.dto.ml;

public class MlPredictionFactor {
    private String name;
    private double value;

    public MlPredictionFactor() {
    }

    public MlPredictionFactor(String name, double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public double getValue() {
        return value;
    }
}
