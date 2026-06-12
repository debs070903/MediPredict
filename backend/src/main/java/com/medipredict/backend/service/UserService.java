package com.medipredict.backend.service;

import java.time.Instant;
import java.util.UUID;

import com.medipredict.backend.config.MediPredictProperties;
import com.medipredict.backend.domain.PasswordResetToken;
import com.medipredict.backend.domain.User;
import com.medipredict.backend.dto.auth.AuthResponse;
import com.medipredict.backend.dto.auth.LoginRequest;
import com.medipredict.backend.dto.auth.RegisterRequest;
import com.medipredict.backend.dto.user.ProfileUpdateRequest;
import com.medipredict.backend.dto.user.UserResponse;
import com.medipredict.backend.exception.ConflictException;
import com.medipredict.backend.exception.NotFoundException;
import com.medipredict.backend.exception.UnauthorizedException;
import com.medipredict.backend.repository.PasswordResetTokenRepository;
import com.medipredict.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final MediPredictProperties properties;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, MediPredictProperties properties,PasswordResetTokenRepository passwordResetTokenRepository,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.properties = properties;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new ConflictException("An account already exists for that email address");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        issueSession(user);

        userRepository.save(user);
        return new AuthResponse(user.getSessionToken(), UserResponse.from(user));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        issueSession(user);
        userRepository.save(user);
        return new AuthResponse(user.getSessionToken(), UserResponse.from(user));
    }

    public User getAuthenticatedUser(String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        User user = userRepository.findBySessionToken(token)
                .orElseThrow(() -> new UnauthorizedException("Session expired or invalid"));

        if (user.getSessionExpiresAt() == null || user.getSessionExpiresAt().isBefore(Instant.now())) {
            throw new UnauthorizedException("Session expired or invalid");
        }

        return user;
    }

    @Transactional
    public UserResponse updateProfile(User user, ProfileUpdateRequest request) {
        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName().trim());
        }
        user.setPhone(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setBloodGroup(request.getBloodGroup());
        user.setEmergencyContact(request.getEmergencyContact());
        userRepository.save(user);
        return UserResponse.from(user);
    }

    public UserResponse getProfile(User user) {
        return UserResponse.from(user);
    }

    private void issueSession(User user) {
        user.setSessionToken(UUID.randomUUID().toString().replace("-", ""));
        user.setSessionExpiresAt(Instant.now().plusSeconds(properties.getSessionTtlHours() * 3600));
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new UnauthorizedException("Authorization header is required");
        }

        String normalized = authorizationHeader.trim();
        if (normalized.toLowerCase().startsWith("bearer ")) {
            return normalized.substring(7).trim();
        }

        throw new UnauthorizedException("Authorization header must use Bearer token format");
    }
    
    @Transactional
    public void forgotPassword(String email) {

        userRepository.findByEmailIgnoreCase(
                email.trim().toLowerCase())
                .ifPresent(user -> {

                    passwordResetTokenRepository.deleteByUser(user);

                    String token = UUID.randomUUID().toString();

                    PasswordResetToken resetToken =
                            new PasswordResetToken();

                    resetToken.setToken(token);
                    resetToken.setUser(user);
                    resetToken.setExpiryAt(
                            Instant.now().plusSeconds(900));

                    passwordResetTokenRepository.save(resetToken);

                    String resetLink =
                            "http://localhost:8080/api/auth/reset-password?token="
                                    + token;

                    emailService.sendPasswordResetEmail(
                            user.getEmail(),
                            resetLink);
                });
    }
    public boolean validateResetToken(String token) {

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new UnauthorizedException("Invalid token"));

        return resetToken.getExpiryAt()
                .isAfter(Instant.now());
    }
    @Transactional
    public void resetPassword(
            String token,
            String newPassword) {

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new UnauthorizedException("Invalid token"));

        if (resetToken.getExpiryAt()
                .isBefore(Instant.now())) {

            throw new UnauthorizedException(
                    "Reset token expired");
        }

        User user = resetToken.getUser();

        user.setPasswordHash(
                passwordEncoder.encode(newPassword)
        );

        user.setSessionToken(null);
        user.setSessionExpiresAt(null);

        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }
}
