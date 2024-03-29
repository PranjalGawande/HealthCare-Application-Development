package com.example.HAD.Backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.Calendar;

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
    Calendar date;
    Time time;
    String reasonForVisit;
    String status;

    //To reset Doctor Appointment Id
    Integer doctorId;

    //To change Password
    String oldPassword;
    String newPassword;
}
