package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private AdminController adminController;

    @Autowired
    private ReceptionistController receptionistController;

    @Autowired
    private DoctorController doctorController;

    @PostMapping("/admin")
    public ResponseEntity<StaffDTO> authenticateAdmin(@RequestBody Login request) {
        String token = loginService.authenticate(request);
        Login login = loginService.getLoginByEmail(request.getEmail());

        if(login.getRole().equals(Role.ADMIN)) {
            Admin admin = adminController.getAdminDetails(request.getEmail());
            StaffDTO staff = new StaffDTO(admin, token);
            return ResponseEntity.ok(staff);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/receptionist")
    public ResponseEntity<StaffDTO> authenticateReceptionist(@RequestBody Login request) {
        String token = loginService.authenticate(request);
        Login login = loginService.getLoginByEmail(request.getEmail());

        if(login.getRole().equals(Role.Receptionist)) {
            Receptionist receptionist = receptionistController.getReceptionistDetails(request.getEmail());
            StaffDTO staff = new StaffDTO(receptionist, token);
            return ResponseEntity.ok(staff);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/doctor")
    public ResponseEntity<DoctorDTO> authenticateDoctor(@RequestBody Login request) {
        String token = loginService.authenticate(request);
        Login login = loginService.getLoginByEmail(request.getEmail());

        if(login.getRole().equals(Role.DOCTOR)) {
            Doctor doctor = doctorController.getDoctorDetails(request.getEmail());
            DoctorDTO doctorDTO = new DoctorDTO(doctor , token);
            return ResponseEntity.ok(doctorDTO);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}