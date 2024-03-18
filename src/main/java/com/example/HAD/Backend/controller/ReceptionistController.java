package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.*;
import com.example.HAD.Backend.dto.DoctorListDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/receptionist")
public class ReceptionistController {

    private Receptionist receptionist;

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    public Receptionist getReceptionistDetails(String email) {
        receptionist = receptionistService.getReceptionistDetails(email);
        return receptionist;
    }

    @PostMapping("/addPatient")
    public ResponseEntity<String> addPatientDetails(@RequestBody Patient patient) {
        if(!receptionist.getRole().equals("receptionist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        patientService.addPatient(patient);
        return ResponseEntity.ok().body("Successfully added New Patient Record");
    }

    @PostMapping("/addAppointment/{patientId}/{doctorId}")
    public ResponseEntity<String> addAppointment(@PathVariable("patientId") Integer patientId, @PathVariable("doctorId") Integer doctorId, @RequestBody Appointment appointment) {
        if (!receptionist.getRole().equals("receptionist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Doctor doctor = doctorService.findDoctorById(doctorId);
        appointment.setDoctor(doctor);

        Patient patient = patientService.findPatientById(patientId);
        appointment.setPatient(patient);

        appointmentService.addAppointment(appointment);
        return ResponseEntity.ok().body("Successfully created a new Appointment");
    }

    @GetMapping("/doctorList")
    public ResponseEntity<List<DoctorListDTO>> doctorList() {
        if(!receptionist.getRole().equals("receptionist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        List<DoctorListDTO> doctorListDTOS = doctorService.getDoctorList();
        return ResponseEntity.ok().body(doctorListDTOS);
    }
}
