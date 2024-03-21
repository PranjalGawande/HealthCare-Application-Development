package com.example.HAD.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum Permission {

    ADMIN_GET("admin_get"),
    ADMIN_POST("admin_post"),
    DOCTOR_GET("doctor_get"),
    DOCTOR_POST("doctor_post"),
    RECEPTIONIST_GET("receptionist_get"),
    RECEPTIONIST_POST("receptionist_post")
    ;

    private String permission;
}
