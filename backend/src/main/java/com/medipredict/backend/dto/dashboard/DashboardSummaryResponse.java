package com.medipredict.backend.dto.dashboard;

import java.util.List;

import com.medipredict.backend.dto.prediction.MonthlyTrendPoint;
import com.medipredict.backend.dto.prediction.PredictionHistoryItem;
import com.medipredict.backend.dto.prediction.PredictionResponse;

public class DashboardSummaryResponse {
    private long totalPredictions;
    private double averageMonthlyPremium;
    private PredictionResponse latestPrediction;
    private List<MonthlyTrendPoint> monthlyTrend;
    private List<PredictionHistoryItem> recentPredictions;
    private boolean mlServiceHealthy;
    private String mlModelVersion;

    public long getTotalPredictions() {
        return totalPredictions;
    }

    public void setTotalPredictions(long totalPredictions) {
        this.totalPredictions = totalPredictions;
    }

    public double getAverageMonthlyPremium() {
        return averageMonthlyPremium;
    }

    public void setAverageMonthlyPremium(double averageMonthlyPremium) {
        this.averageMonthlyPremium = averageMonthlyPremium;
    }

    public PredictionResponse getLatestPrediction() {
        return latestPrediction;
    }

    public void setLatestPrediction(PredictionResponse latestPrediction) {
        this.latestPrediction = latestPrediction;
    }

    public List<MonthlyTrendPoint> getMonthlyTrend() {
        return monthlyTrend;
    }

    public void setMonthlyTrend(List<MonthlyTrendPoint> monthlyTrend) {
        this.monthlyTrend = monthlyTrend;
    }

    public List<PredictionHistoryItem> getRecentPredictions() {
        return recentPredictions;
    }

    public void setRecentPredictions(List<PredictionHistoryItem> recentPredictions) {
        this.recentPredictions = recentPredictions;
    }

    public boolean isMlServiceHealthy() {
        return mlServiceHealthy;
    }

    public void setMlServiceHealthy(boolean mlServiceHealthy) {
        this.mlServiceHealthy = mlServiceHealthy;
    }

    public String getMlModelVersion() {
        return mlModelVersion;
    }

    public void setMlModelVersion(String mlModelVersion) {
        this.mlModelVersion = mlModelVersion;
    }
}
