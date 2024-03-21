package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    public void addAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
    }
}
