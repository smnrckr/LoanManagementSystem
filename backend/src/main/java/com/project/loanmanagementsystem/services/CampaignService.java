package com.project.loanmanagementsystem.services;

import com.project.loanmanagementsystem.dto.CampaignDataDTO;
import com.project.loanmanagementsystem.entities.Campaign;
import com.project.loanmanagementsystem.repos.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CampaignService {
    @Autowired
    private CampaignRepository campaignRepository;


    public List<Campaign> getAllCampaigns(){
        return campaignRepository.findAll();
    }

    public List<String> getDistinctCampaignNamesByUserCode(String userCode) {
        return campaignRepository.findDistinctCampaignsByUserCode(userCode);
    }


    public CampaignDataDTO getCampaignDetailsByTermAndCampaignName(String campaignName, Double termLoan) {
        CampaignDataDTO details = campaignRepository.findDetailsByCampaignNameAndTermLoan(campaignName, termLoan);
        return details;
    }

    public List<Double> getUserCampaignTerms(String userCode, String campaignName) {
        return campaignRepository.findUserCampaignTerms(userCode, campaignName);
    }

}
