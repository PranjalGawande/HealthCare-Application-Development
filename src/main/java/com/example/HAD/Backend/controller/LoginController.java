package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.bean.Staff;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
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
    private DoctorController doctorController;

    @Autowired
    private StaffController staffController;

    @Autowired
    private LoginService loginService;

    @PostMapping("/doctor")
    public ResponseEntity<DoctorDTO> loginDoctor(@RequestBody Login login) {
        if (login == null || login.getEmail() == null || login.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        Login loggedIn = loginService.docLogin(login);

        if (loggedIn == null || !loggedIn.getStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            Doctor doctorDetails = doctorController.getDoctorDetails(loggedIn.getEmail());
            if (doctorDetails == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                DoctorDTO doctorDTO = new DoctorDTO(doctorDetails);
                return ResponseEntity.ok(doctorDTO);
            }
        }
    }

    @PostMapping("/staff")
    public ResponseEntity<StaffDTO> loginstaff(@RequestBody Login login) {
        if ( login == null || login.getEmail() == null || login.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login loggedIn = loginService.StaffLogin(login);

        if(loggedIn == null || !loggedIn.getStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        else {
            Staff staffDetail = staffController.getStaffDetails(login.getEmail());
            if (staffDetail == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                StaffDTO staffDTO = new StaffDTO(staffDetail);
                return ResponseEntity.ok().body(staffDTO);
            }
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<String> loginAdmin(@RequestBody Login login) {
        if ( login == null || login.getEmail() == null || login.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login loggedIn = loginService.AdminLogin(login);

        if(loggedIn == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        else {
            Staff staffDetail = staffController.getStaffDetails(login.getEmail());
            return ResponseEntity.ok().body("Logged In Successfully");
        }
    }
}