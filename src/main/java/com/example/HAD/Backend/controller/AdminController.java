package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.ExtraDTO;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.dto.StaffListDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/adminDetails")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<StaffDTO> getAdminDetails(@RequestHeader("Authorization") String token) {
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwtService.extractEmail(token);

        Admin admin = adminService.getAdminDetails(email);
        StaffDTO staffDTO = new StaffDTO(admin);
        return ResponseEntity.ok().body(staffDTO);
    }

    @PostMapping("/addLogin")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addLoginDetails(@RequestBody Login login) {
        loginService.addLogin(login);
        return ResponseEntity.ok().body("Login Details added Successfully");
    }

    @PostMapping("/addDoctor")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addDoctorDetails(@RequestBody DoctorDTO doctorDTO) {
        Login login = loginService.getLoginByEmail(doctorDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Doctor doctor = new Doctor(doctorDTO);
        doctor.setLogin(login);

        doctorService.addDoctor(doctor);
        return ResponseEntity.ok().body("Doctor Record Added Successfully");
    }

    @PostMapping("/addAdmin")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addAdminDetails(@RequestBody StaffDTO staffDTO) {
        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Admin admin = new Admin(staffDTO);
        admin.setLogin(login);

        adminService.addAdmin(admin);
        return ResponseEntity.ok().body("Admin Record Added Successfully");
    }

    @PostMapping("/addReceptionist")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addReceptionistDetails(@RequestBody StaffDTO staffDTO) {
        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Receptionist receptionist = new Receptionist(staffDTO);
        receptionist.setLogin(login);

        receptionistService.addReceptionist(receptionist);
        return ResponseEntity.ok().body("Receptionist Record Added Successfully");
    }

    @PostMapping("/deActivateStaff")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> deactivateStaff(@RequestBody ExtraDTO extraDTO) {
        Login login = loginService.getLoginByEmail(extraDTO.getEmail());
        login.setStatus(false);

        loginService.setLogin(login);
        return ResponseEntity.ok().body("Successfully Deactivated Staff Account");
    }

    @PostMapping("/activateStaff")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> activateStaff(@RequestBody ExtraDTO extraDTO) {
        Login login = loginService.getLoginByEmail(extraDTO.getEmail());
        login.setStatus(true);

        loginService.setLogin(login);
        return ResponseEntity.ok().body("Successfully Activated Staff Account");
    }

    @GetMapping("/staffList")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<List<StaffListDTO>> staffList() {
        List<StaffListDTO> adminListDTOS = adminService.getAdminList();
        List<StaffListDTO> receptionistListDTOS = receptionistService.getRecetionistList();

        List<StaffListDTO> staffListDTOS = new ArrayList<>();
        staffListDTOS.addAll(adminListDTOS);
        staffListDTOS.addAll(receptionistListDTOS);

        return ResponseEntity.ok().body(staffListDTOS);
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO) {
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String userName = jwtService.extractEmail(token);
        if(!loginService.verifyCurrentPassword(userName, extraDTO.getOldPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
        }

        loginService.updateLogin(userName, extraDTO.getNewPassword());
        return ResponseEntity.ok("Password changed Successfully");
    }
}