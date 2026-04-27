package com.medipredict.backend.dto.prediction;

public class MonthlyTrendPoint {
    private String month;
    private double premium;

    public MonthlyTrendPoint() {
    }

    public MonthlyTrendPoint(String month, double premium) {
        this.month = month;
        this.premium = premium;
    }

    public String getMonth() {
        return month;
    }

    public double getPremium() {
        return premium;
    }
}
