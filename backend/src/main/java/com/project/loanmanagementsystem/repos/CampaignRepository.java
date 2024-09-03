package com.project.loanmanagementsystem.repos;

import com.project.loanmanagementsystem.dto.CampaignDataDTO;
import com.project.loanmanagementsystem.entities.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findAll();
    Optional<Campaign> findByCampaignCode(String campaignCode);

    @Query("SELECT DISTINCT uc.campaign.campaignName " +
            "FROM UserCampaign uc " +
            "WHERE uc.user.userCode = :userCode")
    List<String> findDistinctCampaignsByUserCode(@Param("userCode") String userCode);


    @Query("SELECT new com.project.loanmanagementsystem.dto.CampaignDataDTO(c.campaignCode, c.campaignName, c.termLoan, c.interestRate) " +
            "FROM Campaign c WHERE c.campaignName = :campaignName AND c.termLoan = :termLoan")
    CampaignDataDTO findDetailsByCampaignNameAndTermLoan(@Param("campaignName") String campaignCode, @Param("termLoan") Double termLoan);

    @Query("SELECT DISTINCT c.termLoan " +
            "FROM Campaign c " +
            "JOIN UserCampaign uc ON uc.campaign.campaignCode = c.campaignCode " +
            "WHERE uc.user.userCode = :userCode AND c.campaignName = :campaignName")
    List<Double> findUserCampaignTerms(@Param("userCode") String userCode, @Param("campaignName") String campaignName);


}