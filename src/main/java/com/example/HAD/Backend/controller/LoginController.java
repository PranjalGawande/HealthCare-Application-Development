package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.Token;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AccessLogsService accessLogsService;

    @PostMapping("/admin")
    public ResponseEntity<Token> authenticateAdmin(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));

        Admin admin = adminService.getAdminDetails(request.getEmail());
        Integer accessedRecordId;
        if (admin == null) {
            accessedRecordId = null;
        } else {
            accessedRecordId = admin.getAdminId();
        }

        assert admin != null;
        accessLogsService.accessLogs("Admin", null, request.getEmail(), "Login Record", accessedRecordId, admin.getLogin().getEmail(),"Login Attempt");
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/receptionist")
    public ResponseEntity<Token> authenticateReceptionist(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));

        Receptionist receptionist = receptionistService.getReceptionistDetails(request.getEmail());
        Integer accessedRecordId;
        if (receptionist == null) {
            accessedRecordId = null;
        } else {
            accessedRecordId = receptionist.getReceptionistId();
        }

        assert receptionist != null;
        accessLogsService.accessLogs("Receptionist", null, request.getEmail(), "Login Record", accessedRecordId, receptionist.getLogin().getEmail(),"Login Attempt");
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/doctor")
    public ResponseEntity<Token> authenticateDoctor(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));

        Doctor doctor = doctorService.getDoctorDetailsByEmail(request.getEmail());
        Integer accessedRecordId;
        if (doctor == null) {
            accessedRecordId = null;
        } else {
            accessedRecordId = doctor.getDoctorId();
        }

        assert doctor != null;
        accessLogsService.accessLogs("Doctor", null, request.getEmail(), "Login Record", accessedRecordId, doctor.getLogin().getEmail(),"Login Attempt");
        return ResponseEntity.ok().body(token);
    }
}