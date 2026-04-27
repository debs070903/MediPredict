package com.medipredict.backend.controller;

import com.medipredict.backend.dto.auth.AuthResponse;
import com.medipredict.backend.dto.auth.LoginRequest;
import com.medipredict.backend.dto.auth.RegisterRequest;
import com.medipredict.backend.dto.user.UserResponse;
import com.medipredict.backend.domain.User;
import com.medipredict.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> currentUser(@RequestHeader(value = "Authorization", required = false) String authorization) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(userService.getProfile(user));
    }
}
