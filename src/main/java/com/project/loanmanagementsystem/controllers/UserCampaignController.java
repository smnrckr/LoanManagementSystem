package com.project.loanmanagementsystem.controllers;

import com.project.loanmanagementsystem.dto.UserCampaignDeleteRequest;
import com.project.loanmanagementsystem.dto.UserCampaignRequest;
import com.project.loanmanagementsystem.dto.UserCampaignTableResponse;
import com.project.loanmanagementsystem.entities.UserCampaign;
import com.project.loanmanagementsystem.services.UserCampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/")
public class UserCampaignController {


    @Autowired
    private UserCampaignService userCampaignService;


    @GetMapping("/user-campaign-table")
    public ResponseEntity<List<UserCampaignTableResponse>> getUserCampaignDetails() {
        List<UserCampaignTableResponse> userCampaignList = userCampaignService.getUserCampaignDetails();
        return ResponseEntity.ok(userCampaignList);
    }

    @PostMapping("/user-campaign-table")
    public ResponseEntity<String> addUserCampaign(@RequestBody UserCampaignRequest request) {
        try {
            UserCampaign savedUserCampaign = userCampaignService.addUserCampaign(request);
            return ResponseEntity.ok("UserCampaign başarıyla kaydedildi: " + savedUserCampaign);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("UserCampaign kaydı oluşturulurken hata meydana geldi: " + e.getMessage());
        }
    }

    @DeleteMapping("/user-campaign-table")
    public ResponseEntity<String> deleteUserCampaign(@RequestBody UserCampaignDeleteRequest request) {
        Long id = request.getId();
        if (id == null) {
            return ResponseEntity.badRequest().body("ID cant be empty kardeşim");
        }
        Optional<UserCampaign> deletedRow = userCampaignService.deleteUserCampaign(id);
        return ResponseEntity.ok("Deleted Row: " + deletedRow);
    }


}

