package com.medipredict.backend.dto.ml;

public class MlHealthResponse {
    private String status;
    private Boolean modelLoaded;
    private String version;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getModelLoaded() {
        return modelLoaded;
    }

    public void setModelLoaded(Boolean modelLoaded) {
        this.modelLoaded = modelLoaded;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
