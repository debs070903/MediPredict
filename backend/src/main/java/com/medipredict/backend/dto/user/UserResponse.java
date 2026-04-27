package com.medipredict.backend.dto.user;

import java.time.LocalDate;

import com.medipredict.backend.domain.User;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String emergencyContact;

    public static UserResponse from(User user) {
        UserResponse response = new UserResponse();
        response.id = user.getId();
        response.name = user.getName();
        response.email = user.getEmail();
        response.phone = user.getPhone();
        response.dateOfBirth = user.getDateOfBirth();
        response.bloodGroup = user.getBloodGroup();
        response.emergencyContact = user.getEmergencyContact();
        return response;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }
}
