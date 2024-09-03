package com.project.loanmanagementsystem.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name= "user_entity")

public class User {

    @Id
    @Column(name = "user_code")
    private String userCode;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Loan> loansTable;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, unique = true)
    private String tcknVkn;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private int userType;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getTcknVkn() {
        return tcknVkn;
    }

    public void setTcknVkn(String tcknVkn) {
        this.tcknVkn = tcknVkn;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Loan> getLoansTable() {
        return loansTable;
    }

    public void setLoansTable(List<Loan> loansTable) {
        this.loansTable = loansTable;
    }


    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }



}
