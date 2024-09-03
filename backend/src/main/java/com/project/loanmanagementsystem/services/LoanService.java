package com.project.loanmanagementsystem.services;

import com.project.loanmanagementsystem.entities.Loan;
import com.project.loanmanagementsystem.entities.User;
import com.project.loanmanagementsystem.repos.LoanRepository;
import com.project.loanmanagementsystem.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Loan> getLoanTableByUserId(String userId) {
        return loanRepository.findByUserUserCode(userId);
    }

    @Transactional
    public Loan createLoan(Loan loan, String userCode) {
        Optional<User> userOptional = userRepository.findByUserCode(userCode);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with userCode: " + userCode);
        }
        User user = userOptional.get();
        loan.setUser(user);

        if (loan.getCampaignName() != null && !loan.getCampaignName().isEmpty()) {
            loan.setCampaignName(loan.getCampaignName());
        }

        if (calculateAge(loan.getBirthDate()) < 18) {
            throw new IllegalArgumentException("AGE_RESTRICTION");
        }

        return loanRepository.save(loan);
    }

    private int calculateAge(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

}