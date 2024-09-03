package com.project.loanmanagementsystem.repos;

import com.project.loanmanagementsystem.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByTcknVknAndPassword(String tcknVkn, String password);
    Optional<User> findByTcknVkn(String tcknVkn);
    Optional<User> findByEmail(String email);
    Optional<User> findByUserCode(String userCode);
    List<User>  findAll();


}