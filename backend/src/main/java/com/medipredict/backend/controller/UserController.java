package com.medipredict.backend.controller;

import com.medipredict.backend.domain.User;
import com.medipredict.backend.dto.user.ProfileUpdateRequest;
import com.medipredict.backend.dto.user.UserResponse;
import com.medipredict.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(@RequestHeader(value = "Authorization", required = false) String authorization) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(userService.getProfile(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody ProfileUpdateRequest request
    ) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(userService.updateProfile(user, request));
    }
}
