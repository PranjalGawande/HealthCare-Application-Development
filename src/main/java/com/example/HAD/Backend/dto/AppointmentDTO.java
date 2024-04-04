package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AppointmentDTO {
    private Integer tokenNo;
    private LocalDate date;
    private LocalTime time;
    private String reasonForVisit;

    public AppointmentDTO(Appointment appointment) {
        this.tokenNo = appointment.getTokenNo();
        this.date = appointment.getDate();
        this.time = appointment.getTime();
        this.reasonForVisit = appointment.getReasonForVisit();
    }
}