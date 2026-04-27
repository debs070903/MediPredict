package com.medipredict.backend.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "medipredict")
public class MediPredictProperties {

    private String frontendUrl = "http://localhost:3000";
    private String mlServiceBaseUrl = "http://localhost:8000";
    private String applicationName = "MediPredict Backend";
    private String currency = "INR";
    private long sessionTtlHours = 24;
    private List<String> allowedOrigins = new ArrayList<>(List.of("http://localhost:3000"));

    public String getFrontendUrl() {
        return frontendUrl;
    }

    public void setFrontendUrl(String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    public String getMlServiceBaseUrl() {
        return mlServiceBaseUrl;
    }

    public void setMlServiceBaseUrl(String mlServiceBaseUrl) {
        this.mlServiceBaseUrl = mlServiceBaseUrl;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public long getSessionTtlHours() {
        return sessionTtlHours;
    }

    public void setSessionTtlHours(long sessionTtlHours) {
        this.sessionTtlHours = sessionTtlHours;
    }

    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }

    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    public void setAllowedOriginsFromString(String origins) {
        if (origins == null || origins.isBlank()) {
            return;
        }
        this.allowedOrigins = Arrays.stream(origins.split(","))
                .map(String::trim)
                .filter(value -> !value.isEmpty())
                .toList();
    }
}
