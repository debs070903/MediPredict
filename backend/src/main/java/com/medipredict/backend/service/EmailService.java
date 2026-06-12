package com.medipredict.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String email, String resetLink) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("soumyadipsadhukhan8@gmail.com");
        message.setTo(email);
        message.setSubject("MediPredict Password Reset");

        message.setText("""
                Hello,

                We received a request to reset your password.

                Click the link below:

                %s

                This link expires in 15 minutes.

                If you did not request this, ignore this email.

                MediPredict Team
                """.formatted(resetLink));

        mailSender.send(message);
    }
}
