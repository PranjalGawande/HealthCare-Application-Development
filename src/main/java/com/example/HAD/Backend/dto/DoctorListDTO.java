package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.bean.Doctor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DoctorListDTO {
    private String name;
    private String email;
    private String speciality;
}
