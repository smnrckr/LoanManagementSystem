package com.project.loanmanagementsystem.services;

import com.project.loanmanagementsystem.dto.UserCampaignRequest;
import com.project.loanmanagementsystem.dto.UserCampaignTableResponse;
import com.project.loanmanagementsystem.entities.Campaign;
import com.project.loanmanagementsystem.entities.User;
import com.project.loanmanagementsystem.entities.UserCampaign;
import com.project.loanmanagementsystem.repos.CampaignRepository;
import com.project.loanmanagementsystem.repos.UserCampaignRepository;
import com.project.loanmanagementsystem.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserCampaignService {
    @Autowired
    private UserCampaignRepository userCampaignRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CampaignRepository campaignRepository;

    public List<UserCampaignTableResponse> getUserCampaignDetails() {
        List<Object[]> results = userCampaignRepository.findUserCampaignDetails();
        List<UserCampaignTableResponse> userCampaignList = new ArrayList<>();
        for (Object[] result : results) {
            UserCampaignTableResponse userCampaign = new UserCampaignTableResponse();
            userCampaign.setId(((Number) result[0]).longValue());
            userCampaign.setUserCode((String) result[1]);
            userCampaign.setCompanyName((String) result[2]);
            userCampaign.setCampaignCode((String) result[3]);
            userCampaign.setCampaignName((String) result[4]);
            userCampaignList.add(userCampaign);
        }
        return userCampaignList;
    }


    @Transactional
    public UserCampaign addUserCampaign(UserCampaignRequest request) {
        User user = userRepository.findByUserCode(request.getUserCode())
                .orElseThrow(() -> new IllegalArgumentException("Kullanıcı bulunamadı: " + request.getUserCode()));
        Campaign campaign = campaignRepository.findByCampaignCode(request.getCampaignCode())
                .orElseThrow(() -> new IllegalArgumentException("Kampanya bulunamadı: " + request.getCampaignCode()));

        UserCampaign userCampaign = new UserCampaign();
        userCampaign.setUser(user);
        userCampaign.setCampaign(campaign);

        return userCampaignRepository.save(userCampaign);
    }

    @Transactional
    public Optional<UserCampaign> deleteUserCampaign(Long id) {
        return userCampaignRepository.deleteUserCampaignById(id);
    }

}