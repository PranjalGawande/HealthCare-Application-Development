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


        for (Appointment appointment : doctor.getAppointments()) {
            this.appointmentsList.add(new AppointmentDTO(appointment));
        }
    }
}