package com.medipredict.backend.controller;

import java.util.List;

import com.medipredict.backend.domain.User;
import com.medipredict.backend.dto.prediction.PredictionHistoryItem;
import com.medipredict.backend.dto.prediction.PredictionRequest;
import com.medipredict.backend.dto.prediction.PredictionResponse;
import com.medipredict.backend.service.PredictionService;
import com.medipredict.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    private final PredictionService predictionService;
    private final UserService userService;

    public PredictionController(PredictionService predictionService, UserService userService) {
        this.predictionService = predictionService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<PredictionResponse> createPrediction(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody PredictionRequest request
    ) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(predictionService.createPrediction(user, request));
    }

    @GetMapping
    public ResponseEntity<List<PredictionHistoryItem>> getHistory(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(predictionService.getHistory(user));
    }
}
