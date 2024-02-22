package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.*;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/staff")
public class StaffController {

    private Boolean userAdmin = false;

    private Staff staff;

    @Autowired
    private StaffService staffService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private AppointmentService appointmentService;
    public Staff getStaffDetails(String email) {
        staff = staffService.getStaffDetails(email);
        return staff;
    }

    @PostMapping("/addLogin")
    public ResponseEntity<String> addLoginDetails(@RequestBody Login login) {
        if (!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        loginService.addLogin(login);
        return ResponseEntity.ok().body("Login Details added Successfully");
    }

    @PostMapping("/addDoctor")
    public ResponseEntity<String> addDoctorDetails(@RequestBody DoctorDTO doctorDTO) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login login = loginService.getLoginByEmail(doctorDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Doctor doctor = new Doctor(doctorDTO);
        doctor.setLogin(login);

        doctorService.addDoctor(doctor);
        return ResponseEntity.ok().body("Doctor Record Added Successfully");
    }

    @PostMapping("/addStaff")
    public ResponseEntity<String> addStaffdetails(@RequestBody StaffDTO staffDTO) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Staff staff = new Staff(staffDTO);
        staff.setLogin(login);

        staffService.addStaff(staff);
        return ResponseEntity.ok().body("Staff Record Added Successfully");
    }

    @PostMapping("/addPatient")
    public ResponseEntity<String> addPatientDetails(@RequestBody Patient patient) {
        if(!staff.getRole().equals("receptionist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        patientService.addPatient(patient);
        return ResponseEntity.ok().body("Successfully added New Patient Record");
    }

    @PostMapping("/addAppointment/{patientId}/{doctorId}")
    public ResponseEntity<String> addAppointment(@PathVariable("patientId") Integer patientId, @PathVariable("doctorId") Integer doctorId, @RequestBody Appointment appointment) {
        if (!staff.getRole().equals("receptionist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Doctor doctor = doctorService.findDoctorById(doctorId);
        appointment.setDoctor(doctor);

        Patient patient = patientService.findPatientById(patientId);
        appointment.setPatient(patient);

        appointmentService.addAppointment(appointment);
        return ResponseEntity.ok().body("Successfully created a new Appointment");
    }
}