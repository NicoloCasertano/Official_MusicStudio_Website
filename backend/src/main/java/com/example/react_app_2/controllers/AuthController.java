package com.example.react_app_2.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.react_app_2.models.entities.User;
import com.example.react_app_2.models.repositories.UserRepo;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepo userRepo;

    public AuthController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().build();
        return userRepo.findByEmailAndPassword(email, password).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
    }

}
