package com.project.loanmanagementsystem.dto;

public class UserLoginResponse {
    String userCode;
    int userType;

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public UserLoginResponse(String userCode, int userType) {
        this.userCode = userCode;
        this.userType = userType;
    }
}
