package com.project.loanmanagementsystem.dto;

public class CampaignDataDTO {
    private String campaignCode;
    private String campaignName;
    private double termLoan;
    private double interestRate;

    public String getCampaignCode() {
        return campaignCode;
    }

    public void setCampaignCode(String campaignCode) {
        this.campaignCode = campaignCode;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public double getTermLoan() {
        return termLoan;
    }

    public void setTermLoan(double termLoan) {
        this.termLoan = termLoan;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }
    public CampaignDataDTO() {

    }
    public CampaignDataDTO(String campaignCode, String campaignName, Double termLoan, Double interestRate) {
        this.campaignCode = campaignCode;
        this.campaignName = campaignName;
        this.termLoan = termLoan;
        this.interestRate = interestRate;
    }

    public CampaignDataDTO(Double termLoan, Double interestRate) {
        this.termLoan = termLoan;
        this.interestRate = interestRate;
    }

}