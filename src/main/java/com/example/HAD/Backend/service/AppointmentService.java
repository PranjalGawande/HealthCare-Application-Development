package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    public void addAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

//    public Appointment getAppointmentDetails(Integer doctorId, Integer patientId) {
//        return appointmentRepository.getAppointmentDetails(doctorId, patientId);
//    }

    public void updateAppointment(Integer appointmentId, String status) {
        appointmentRepository.updateAppointmentDetail(appointmentId, status);
    }

    public Optional<Appointment> getAppointmentBytokenNo(Integer doctorId, Integer tokenNo) {
        return appointmentRepository.getAppointmentByToken(doctorId, tokenNo, "pending");
    }
}
