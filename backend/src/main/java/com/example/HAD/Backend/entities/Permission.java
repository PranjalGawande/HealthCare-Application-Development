package com.example.HAD.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum Permission {

    ADMIN_GET("admin:get"),
    ADMIN_POST("admin:post"),
    DOCTOR_GET("doctor:get"),
    DOCTOR_POST("doctor:post"),
    RECEPTIONIST_GET("receptionist:get"),
    RECEPTIONIST_POST("receptionist:post")
    ;

    private String permission;
}
