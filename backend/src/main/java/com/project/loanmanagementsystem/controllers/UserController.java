package com.project.loanmanagementsystem.controllers;

import com.project.loanmanagementsystem.dto.UserLoginRequest;
import com.project.loanmanagementsystem.dto.UserLoginResponse;
import com.project.loanmanagementsystem.entities.User;
import com.project.loanmanagementsystem.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.loanmanagementsystem.services.UserService;
import java.util.*;

@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> loginUser(@RequestBody UserLoginRequest request) {
        UserLoginResponse response = userService.loginUser(request.getTcknVkn(), request.getPassword());
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}

