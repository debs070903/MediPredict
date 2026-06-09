
package com.medipredict.backend.dto.prediction;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PredictionRequest {

    @NotNull
    @Min(0)
    @Max(120)
    private Integer age;

    @NotBlank
    private String gender;

    @NotNull
    @Min(30)
    @Max(250)
    private Double heightCm;

    @NotNull
    @Min(10)
    @Max(400)
    private Double weightKg;

    private Double bmi;

    @NotBlank
    private String smokingStatus;

    @NotBlank
    private String region;

    @Min(0)
    @Max(20)
    private Integer children = 0;

    // ================= LIFESTYLE =================

    private String alcoholFreq;

    private String urbanRural;

    private Integer householdSize = 0;

    private Double income = 0.0;

    private String employmentStatus;

    // ================= HEALTHCARE USAGE =================

    private Integer visitsLastYear = 0;

    private Integer hospitalizationsLast3Yrs = 0;

    private Integer daysHospitalizedLast3Yrs = 0;

    private Integer medicationCount = 0;

    // ================= MEDICAL CONDITIONS =================

    private Boolean hypertension = false;

    private Boolean diabetes = false;

    private Boolean asthma = false;

    private Boolean copd = false;

    private Boolean cardiovascularDisease = false;

    private Boolean cancerHistory = false;

    private Boolean kidneyDisease = false;

    private Boolean liverDisease = false;

    private Boolean arthritis = false;

    private Boolean mentalHealth = false;

    private Integer chronicCount = 0;

    private Boolean highRisk = false;

    // ================= CLINICAL METRICS =================

    private Double systolicBp = 0.0;

    private Double diastolicBp = 0.0;

    private Double ldl = 0.0;

    private Double hba1c = 0.0;

    // ================= PROCEDURE HISTORY =================

    private Boolean hadMajorProcedure = false;

    private Integer procImagingCount = 0;

    private Integer procSurgeryCount = 0;

    private Integer procPhysioCount = 0;

    private Integer procConsultCount = 0;

    private Integer procLabCount = 0;

    // ================= EXISTING GETTERS & SETTERS =================

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Double getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(Double heightCm) {
        this.heightCm = heightCm;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public String getSmokingStatus() {
        return smokingStatus;
    }

    public void setSmokingStatus(String smokingStatus) {
        this.smokingStatus = smokingStatus;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Integer getChildren() {
        return children;
    }

    public void setChildren(Integer children) {
        this.children = children;
    }

    // ================= NEW GETTERS & SETTERS =================

    public String getAlcoholFreq() {
        return alcoholFreq;
    }

    public void setAlcoholFreq(String alcoholFreq) {
        this.alcoholFreq = alcoholFreq;
    }

    public String getUrbanRural() {
        return urbanRural;
    }

    public void setUrbanRural(String urbanRural) {
        this.urbanRural = urbanRural;
    }

    public Integer getHouseholdSize() {
        return householdSize;
    }

    public void setHouseholdSize(Integer householdSize) {
        this.householdSize = householdSize;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public Integer getVisitsLastYear() {
        return visitsLastYear;
    }

    public void setVisitsLastYear(Integer visitsLastYear) {
        this.visitsLastYear = visitsLastYear;
    }

    public Integer getHospitalizationsLast3Yrs() {
        return hospitalizationsLast3Yrs;
    }

    public void setHospitalizationsLast3Yrs(Integer hospitalizationsLast3Yrs) {
        this.hospitalizationsLast3Yrs = hospitalizationsLast3Yrs;
    }

    public Integer getDaysHospitalizedLast3Yrs() {
        return daysHospitalizedLast3Yrs;
    }

    public void setDaysHospitalizedLast3Yrs(Integer daysHospitalizedLast3Yrs) {
        this.daysHospitalizedLast3Yrs = daysHospitalizedLast3Yrs;
    }

    public Integer getMedicationCount() {
        return medicationCount;
    }

    public void setMedicationCount(Integer medicationCount) {
        this.medicationCount = medicationCount;
    }

    public Boolean getHypertension() {
        return hypertension;
    }

    public void setHypertension(Boolean hypertension) {
        this.hypertension = hypertension;
    }

    public Boolean getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(Boolean diabetes) {
        this.diabetes = diabetes;
    }

    public Boolean getAsthma() {
        return asthma;
    }

    public void setAsthma(Boolean asthma) {
        this.asthma = asthma;
    }

    public Boolean getCopd() {
        return copd;
    }

    public void setCopd(Boolean copd) {
        this.copd = copd;
    }

    public Boolean getCardiovascularDisease() {
        return cardiovascularDisease;
    }

    public void setCardiovascularDisease(Boolean cardiovascularDisease) {
        this.cardiovascularDisease = cardiovascularDisease;
    }

    public Boolean getCancerHistory() {
        return cancerHistory;
    }

    public void setCancerHistory(Boolean cancerHistory) {
        this.cancerHistory = cancerHistory;
    }

    public Boolean getKidneyDisease() {
        return kidneyDisease;
    }

    public void setKidneyDisease(Boolean kidneyDisease) {
        this.kidneyDisease = kidneyDisease;
    }

    public Boolean getLiverDisease() {
        return liverDisease;
    }

    public void setLiverDisease(Boolean liverDisease) {
        this.liverDisease = liverDisease;
    }

    public Boolean getArthritis() {
        return arthritis;
    }

    public void setArthritis(Boolean arthritis) {
        this.arthritis = arthritis;
    }

    public Boolean getMentalHealth() {
        return mentalHealth;
    }

    public void setMentalHealth(Boolean mentalHealth) {
        this.mentalHealth = mentalHealth;
    }

    public Integer getChronicCount() {
        return chronicCount;
    }

    public void setChronicCount(Integer chronicCount) {
        this.chronicCount = chronicCount;
    }

    public Boolean getHighRisk() {
        return highRisk;
    }

    public void setHighRisk(Boolean highRisk) {
        this.highRisk = highRisk;
    }

    public Double getSystolicBp() {
        return systolicBp;
    }

    public void setSystolicBp(Double systolicBp) {
        this.systolicBp = systolicBp;
    }

    public Double getDiastolicBp() {
        return diastolicBp;
    }

    public void setDiastolicBp(Double diastolicBp) {
        this.diastolicBp = diastolicBp;
    }

    public Double getLdl() {
        return ldl;
    }

    public void setLdl(Double ldl) {
        this.ldl = ldl;
    }

    public Double getHba1c() {
        return hba1c;
    }

    public void setHba1c(Double hba1c) {
        this.hba1c = hba1c;
    }

    public Boolean getHadMajorProcedure() {
        return hadMajorProcedure;
    }

    public void setHadMajorProcedure(Boolean hadMajorProcedure) {
        this.hadMajorProcedure = hadMajorProcedure;
    }

    public Integer getProcImagingCount() {
        return procImagingCount;
    }

    public void setProcImagingCount(Integer procImagingCount) {
        this.procImagingCount = procImagingCount;
    }

    public Integer getProcSurgeryCount() {
        return procSurgeryCount;
    }

    public void setProcSurgeryCount(Integer procSurgeryCount) {
        this.procSurgeryCount = procSurgeryCount;
    }

    public Integer getProcPhysioCount() {
        return procPhysioCount;
    }

    public void setProcPhysioCount(Integer procPhysioCount) {
        this.procPhysioCount = procPhysioCount;
    }

    public Integer getProcConsultCount() {
        return procConsultCount;
    }

    public void setProcConsultCount(Integer procConsultCount) {
        this.procConsultCount = procConsultCount;
    }

    public Integer getProcLabCount() {
        return procLabCount;
    }

    public void setProcLabCount(Integer procLabCount) {
        this.procLabCount = procLabCount;
    }
}

