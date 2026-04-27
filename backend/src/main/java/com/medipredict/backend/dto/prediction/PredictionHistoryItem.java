package com.medipredict.backend.dto.prediction;

import java.time.Instant;

public class PredictionHistoryItem {
    private Long id;
    private Instant createdAt;
    private double monthlyPremium;
    private double annualPremium;
    private String region;
    private String smokingStatus;
    private Double bmi;
    private String predictionSource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSmokingStatus() {
        return smokingStatus;
    }

    public void setSmokingStatus(String smokingStatus) {
        this.smokingStatus = smokingStatus;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public String getPredictionSource() {
        return predictionSource;
    }

    public void setPredictionSource(String predictionSource) {
        this.predictionSource = predictionSource;
    }
}
