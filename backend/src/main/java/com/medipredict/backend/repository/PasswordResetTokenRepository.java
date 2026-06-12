package com.medipredict.backend.repository;

import java.time.Instant;
import java.util.Optional;

import com.medipredict.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.medipredict.backend.domain.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
	Optional<PasswordResetToken> findByToken(String token);
	void deleteByUser(User user);
	void deleteByExpiryAtBefore(Instant now);
}
