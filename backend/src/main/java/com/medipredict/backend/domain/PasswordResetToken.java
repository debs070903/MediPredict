package com.medipredict.backend.domain;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false, unique = true, length = 128)
	    private String token;

	    @Column(nullable = false)
	    private Instant expiryAt;

	    @Column(nullable = false)
	    private Instant createdAt;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user;

	    @PrePersist
	    void onCreate() {
	        this.createdAt = Instant.now();
	    }

	    public Long getId() {
	        return id;
	    }

	    public String getToken() {
	        return token;
	    }

	    public void setToken(String token) {
	        this.token = token;
	    }

	    public Instant getExpiryAt() {
	        return expiryAt;
	    }

	    public void setExpiryAt(Instant expiryAt) {
	        this.expiryAt = expiryAt;
	    }

	    public Instant getCreatedAt() {
	        return createdAt;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }

}
