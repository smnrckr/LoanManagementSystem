package com.project.loanmanagementsystem.entities;

import jakarta.persistence.*;

@Entity
@Table(name="campaign_entity")
public class Campaign {

    @Id
    @Column(name = "campaign_code")
    private String campaignCode;

    private String campaignName;

    private double termLoan;
    private double interestRate;

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public String getCampaignCode() {
        return campaignCode;
    }

    public void setCampaignCode(String campaignCode) {
        this.campaignCode = campaignCode;
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
}
