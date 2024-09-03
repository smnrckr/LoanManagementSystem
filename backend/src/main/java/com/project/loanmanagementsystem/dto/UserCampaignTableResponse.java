package com.project.loanmanagementsystem.dto;

public class UserCampaignTableResponse {
    Long id;
    String userCode;
    String campaignCode;
    String campaignName;
    String companyName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public UserCampaignTableResponse() {
    }

    public UserCampaignTableResponse(Long id, String userCode, String companyName, String campaignCode, String campaignName) {
        this.id = id;
        this.userCode = userCode;
        this.campaignCode = campaignCode;
        this.campaignName = campaignName;
        this.companyName = companyName;
    }
}
