package com.medipredict.backend.repository;

import java.util.Optional;

import com.medipredict.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findBySessionToken(String sessionToken);
    boolean existsByEmailIgnoreCase(String email);
}
