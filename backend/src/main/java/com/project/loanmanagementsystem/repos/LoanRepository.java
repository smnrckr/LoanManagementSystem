package com.project.loanmanagementsystem.repos;

import java.util.List;
import java.util.Optional;

import com.project.loanmanagementsystem.entities.Loan;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LoanRepository extends JpaRepository<Loan,Long> {
    List<Loan> findByUserUserCode(String userCode);
    Optional<Loan> findById(Long id);
}