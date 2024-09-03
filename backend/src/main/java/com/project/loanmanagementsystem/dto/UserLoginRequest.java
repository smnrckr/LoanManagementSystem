package com.project.loanmanagementsystem.dto;

public class UserLoginRequest {
    String tcknVkn;
    String password;

    public String getTcknVkn() {
        return tcknVkn;
    }

    public void setTcknVkn(String tckn) {
        this.tcknVkn = tckn;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserLoginRequest(String tcknVkn, String password) {
        this.tcknVkn = tcknVkn;
        this.password = password;
    }
}
