package com.example.HAD.Backend.dto;
import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DoctorDTO {
    private Integer doctorId;
    private String name;
    private Calendar dob;
    private String gender;
    private String speciality;
    private Integer experience;
    private String email;
    private String mobileNo;
    private Integer tokenMax;
    private Boolean status;
    private List<AppointmentDTO> appointmentsList = new ArrayList<AppointmentDTO>();

    public DoctorDTO(Doctor doctor) {
        this.doctorId = doctor.getDoctorId();
        this.name = doctor.getName();
        this.dob = doctor.getDob();
        this.gender = doctor.getGender();
        this.speciality = doctor.getSpeciality();
        this.experience = doctor.getExperience();
        this.mobileNo = doctor.getMobileNo();
        this.email = doctor.getLogin().getEmail();
        this.tokenMax = doctor.getTokenMax();
        this.status = doctor.getLogin().getStatus();

        for (Appointment appointment : doctor.getAppointments()) {
            if("pending".equals(appointment.getStatus())) {
                this.appointmentsList.add(new AppointmentDTO(appointment));
            }
        }
    }
}