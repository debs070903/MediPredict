package com.medipredict.backend.dto.prediction;

public class PredictionFactor {
    private String name;
    private double value;

    public PredictionFactor() {
    }

    public PredictionFactor(String name, double value) {
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
