package com.project.loanmanagementsystem.repos;


import com.project.loanmanagementsystem.entities.UserCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserCampaignRepository extends JpaRepository<UserCampaign,Long> {
    @Query("SELECT uc.id,uc.user.userCode, uc.user.companyName, uc.campaign.campaignCode, uc.campaign.campaignName " +
            "FROM UserCampaign uc")
    List<Object[]> findUserCampaignDetails();

    Optional<UserCampaign> deleteUserCampaignById(Long id);




}