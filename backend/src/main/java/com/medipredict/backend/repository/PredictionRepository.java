package com.medipredict.backend.repository;

import java.util.List;
import java.util.Optional;

import com.medipredict.backend.domain.PredictionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<PredictionRecord, Long> {
    List<PredictionRecord> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<PredictionRecord> findTopByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserId(Long userId);
}
