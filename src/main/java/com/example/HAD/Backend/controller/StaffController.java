package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.bean.Staff;
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
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        loginService.addLogin(login);
        return ResponseEntity.ok().body("Login Details added Successfully");
    }
}
