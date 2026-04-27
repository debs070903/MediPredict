package com.medipredict.backend;

import com.medipredict.backend.config.MediPredictProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(MediPredictProperties.class)
public class MediPredictApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediPredictApplication.class, args);
    }
}
