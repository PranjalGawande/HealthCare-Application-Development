package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.bean.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AppointmentDTO {
    private Integer appointmentId;
    private Date date;
    private Time time;
    private String reasonForVisit;

    public AppointmentDTO(Appointment appointment) {
        this.appointmentId = appointment.getAppointmentId();
        this.date = appointment.getDate();
        this.time = appointment.getTime();
        this.reasonForVisit = appointment.getReasonForVisit();
    }
}
