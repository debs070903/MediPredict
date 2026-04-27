package com.medipredict.backend.controller;

import java.util.Map;

import com.medipredict.backend.service.MlServiceClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ml")
public class MlController {

    private final MlServiceClient mlServiceClient;

    public MlController(MlServiceClient mlServiceClient) {
        this.mlServiceClient = mlServiceClient;
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(mlServiceClient.health());
    }

    @GetMapping("/model-info")
    public ResponseEntity<Map<String, Object>> modelInfo() {
        return ResponseEntity.ok(mlServiceClient.modelInfo());
    }
}
