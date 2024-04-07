package com.example.HAD.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExtraDTO {
    //To Specify doctor and receptionist
    String email;

    //To search by abha Id
    String abhaId;

    //To create a new appointment
    LocalDate date;
    LocalTime time;
    String reasonForVisit;
    String status;

    //To reset Doctor Appointment ID
    Integer doctorId;

    //To change Password
    String oldPassword;
    String newPassword;
}
