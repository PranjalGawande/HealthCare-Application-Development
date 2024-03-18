package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.*;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.dto.StaffListDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/admin")
public class AdminController {

    private Admin staff;

    @Autowired
    private AdminService adminService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ReceptionistService receptionistService;

    public Admin getAdminDetails(String email) {
        staff = adminService.getAdminDetails(email);
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

    @PostMapping("/addAdmin")
    public ResponseEntity<String> addAdminDetails(@RequestBody StaffDTO staffDTO) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

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
    public ResponseEntity<String> addReceptionistDetails(@RequestBody StaffDTO staffDTO) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }


        Receptionist receptionist = new Receptionist(staffDTO);
        receptionist.setLogin(login);

        receptionistService.addReceptionist(receptionist);
        return ResponseEntity.ok().body("Receptionist Record Added Successfully");
    }

    @PostMapping("/deactivateStaff/{email}")
    public ResponseEntity<String> deactivateStaff(@PathVariable("email") String email) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login login = loginService.getLoginByEmail(email);
        login.setStatus(false);

        loginService.setLogin(login);
        return ResponseEntity.ok().body("Successfully Deactivated Staff Account");
    }

    @PostMapping("/activateStaff/{email}")
    public ResponseEntity<String> activateStaff(@PathVariable("email") String email) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Login login = loginService.getLoginByEmail(email);
        login.setStatus(true);

        loginService.setLogin(login);
        return ResponseEntity.ok().body("Successfully Activated Staff Account");
    }

    @GetMapping("/staffList")
    public ResponseEntity<List<StaffListDTO>> staffList() {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        List<StaffListDTO> adminListDTOS = adminService.getAdminList();
        List<StaffListDTO> receptionistListDTOS = receptionistService.getRecetionistList();

        List<StaffListDTO> staffListDTOS = new ArrayList<>();
        staffListDTOS.addAll(adminListDTOS);
        staffListDTOS.addAll(receptionistListDTOS);

        return ResponseEntity.ok().body(staffListDTOS);
    }

    @PostMapping("/updateDoctor")
    public ResponseEntity<String> updateDoctor(@RequestBody DoctorDTO doctorDTO) {
        if(!staff.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Doctor doctor = doctorService.getDoctorDetailsByEmail(doctorDTO.getEmail());
        doctor.setSpeciality(doctorDTO.getSpeciality());
        doctor.setExperience(doctorDTO.getExperience());
        doctor.setMobileNo(doctorDTO.getMobileNo());

        doctorService.updateDoctor(doctor);
        return ResponseEntity.ok().body("Successfully updated Doctor Details");
    }

    @PostMapping("/updateReceptionist")
    public ResponseEntity<String> updateReceptionist(@RequestBody StaffDTO staffDTO) {
        if(!staff.getRole().equals("admin")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Receptionist receptionist = receptionistService.getReceptionistDetails(staffDTO.getEmail());
        receptionist.setMobileNo(staffDTO.getMobileNo());

        receptionistService.updateReceptionist(receptionist);
        return ResponseEntity.ok().body("Successfully updated Receptionist Details");
    }
}