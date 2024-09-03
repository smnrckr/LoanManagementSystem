package com.project.loanmanagementsystem.entities;

import jakarta.persistence.*;

@Entity
@Table(name="user_campaign_entity")
public class UserCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="campaign_code", referencedColumnName = "campaign_code")
    private Campaign campaign;

    @ManyToOne
    @JoinColumn(name="user_code", referencedColumnName = "user_code")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
