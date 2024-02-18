package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.bean.Staff;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.DoctorService;
import com.example.HAD.Backend.service.LoginService;
import com.example.HAD.Backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/staff")
public class StaffController {

    private Boolean userAdmin = false;

    @Autowired
    private StaffService staffService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private DoctorService doctorService;
    public Staff getStaffDetails(String email) {
        Staff staff = staffService.getStaffDetails(email);

        if (staff.getRole().equals("admin")) {
            userAdmin = true;
        } else {
            userAdmin = false;
        }
        return staff;
    }

    @PostMapping("/addLogin")
    public ResponseEntity<String> addLoginDetails(@RequestBody Login login) {
        if (!userAdmin) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        loginService.addLogin(login);
        return ResponseEntity.ok().body("Login Details added Successfully");
    }

    @PostMapping("/addDoctor")
    public ResponseEntity<String> addDoctorDetails(@RequestBody DoctorDTO doctorDTO) {
        if(!userAdmin) {
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
        if(!userAdmin) {
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
}