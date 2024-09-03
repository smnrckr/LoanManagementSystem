package com.project.loanmanagementsystem.controllers;

import com.project.loanmanagementsystem.dto.CampaignDataDTO;
import com.project.loanmanagementsystem.entities.Campaign;
import com.project.loanmanagementsystem.services.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;


    @GetMapping("/campaigns")
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        List<Campaign> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }
    @GetMapping("/user/{userCode}/distinct")
    public ResponseEntity<List<String>> getDistinctCampaignNamesByUserCode(@PathVariable String userCode) {
        List<String> distinctCampaignNames = campaignService.getDistinctCampaignNamesByUserCode(userCode);
        return ResponseEntity.ok(distinctCampaignNames);
    }

    @GetMapping("/campaign/user/terms")
    public ResponseEntity<List<Double>> getUserCampaignTerms(@RequestParam String userCode, @RequestParam String campaignName) {
        List<Double> terms = campaignService.getUserCampaignTerms(userCode, campaignName);
        if (terms != null && !terms.isEmpty()) {
            return ResponseEntity.ok(terms);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/campaign/details")
    public ResponseEntity<CampaignDataDTO> getCampaignDetailsByTermAndCampaignName( @RequestParam String campaignName, @RequestParam Double termLoan) {
        CampaignDataDTO details = campaignService.getCampaignDetailsByTermAndCampaignName(campaignName, termLoan);

        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
