package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.Login;
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
    private LoginService loginService;

    @PostMapping("/doctor")
    public ResponseEntity<Doctor> login(@RequestBody Login login) {

        if ( login == null || login.getEmail() == null || login.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login loggedIn = loginService.docLogin(login);

        if(loggedIn == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        else
        {
            Doctor doctorDetails = doctorController.getDoctorDetails(loggedIn.getEmail());
            if (doctorDetails == null ) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return ResponseEntity.ok().body(doctorDetails);
        }
    }
}
