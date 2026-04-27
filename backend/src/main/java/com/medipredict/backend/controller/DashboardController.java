package com.medipredict.backend.controller;

import com.medipredict.backend.domain.User;
import com.medipredict.backend.dto.dashboard.DashboardSummaryResponse;
import com.medipredict.backend.service.PredictionService;
import com.medipredict.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PredictionService predictionService;
    private final UserService userService;

    public DashboardController(PredictionService predictionService, UserService userService) {
        this.predictionService = predictionService;
        this.userService = userService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> summary(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        User user = userService.getAuthenticatedUser(authorization);
        return ResponseEntity.ok(predictionService.getDashboardSummary(user));
    }
}
