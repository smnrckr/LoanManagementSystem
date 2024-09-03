package com.project.loanmanagementsystem.controllers;

import com.project.loanmanagementsystem.entities.Loan;
import com.project.loanmanagementsystem.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {

    @Autowired
    private LoanService loanService;


    @PostMapping("/newApplication/{userCode}")
    public ResponseEntity<?> createLoan(@RequestBody Loan loan, @PathVariable String userCode) {
        try {
            Loan createdLoan = loanService.createLoan(loan, userCode);
            return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            if ("AGE_RESTRICTION".equals(e.getMessage())) {
                return new ResponseEntity<>("18 Yaşından Küçüklere Kredi Verilemez!", HttpStatus.BAD_REQUEST);
            } else if (e.getMessage().contains("User not found")) {
                return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
            } else if (e.getMessage().contains("Campaign not found")) {
                return new ResponseEntity<>("Campaign not found.", HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>("Internal server error.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/loans/{userCode}")
    public ResponseEntity<List<Loan>> getLoansByUserCode(@PathVariable String userCode) {
        List<Loan> loans = loanService.getLoanTableByUserId(userCode);
        if (loans.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loans);
    }



}