package com.project.loanmanagementsystem.services;

import com.project.loanmanagementsystem.dto.UserLoginResponse;
import com.project.loanmanagementsystem.repos.UserRepository;
import com.project.loanmanagementsystem.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public UserLoginResponse loginUser(String tcknVkn, String password) {
        Optional<User> user = userRepository.findByTcknVknAndPassword(tcknVkn, password);
        if (user.isPresent()) {
            User currentUser = user.get();
            String userCode = currentUser.getUserCode();
            int userType = currentUser.getUserType();
            return new UserLoginResponse(userCode, userType);
        } else {
            return null;
        }
    }

    public ResponseEntity<?> registerUser(User user) {
        Optional<User> existingUserByTcknVkn = userRepository.findByTcknVkn(user.getTcknVkn());
        if (existingUserByTcknVkn.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("errorCode", "TCKN_VKN_DUPLICATE"));
        }

        Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserByEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("errorCode", "EMAIL_DUPLICATE"));
        }

        user.setUserCode(generateUserCode());
        user.setUserType(1);
        User createdUser = userRepository.save(user);
        return ResponseEntity.ok(Collections.singletonMap("userCode", createdUser.getUserCode()));
    }

    private String generateUserCode() {
        Random random = new Random();
        int randomCode = 1000000000 + random.nextInt(900000000);
        return ("T"+randomCode);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
