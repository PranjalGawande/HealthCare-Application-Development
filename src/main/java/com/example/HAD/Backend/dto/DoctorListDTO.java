package com.example.HAD.Backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DoctorListDTO {
    private Integer doctorId;
    private String name;
    private String email;
    private String speciality;
    private boolean status;
}
