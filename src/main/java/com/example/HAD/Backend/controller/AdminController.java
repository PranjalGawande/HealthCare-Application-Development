package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.*;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private PatientService PatientService;

    @Autowired
    private AnalyticsService analyticsService;

    @Autowired
    private AccessLogsService accessLogsService;

    @GetMapping("/adminDetails")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<StaffDTO> getAdminDetails(@RequestHeader("Authorization") String token) {
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwtService.extractEmail(token);

        Admin admin = adminService.getAdminDetails(email);
        StaffDTO staffDTO = new StaffDTO(admin);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Admin Record", admin.getAdminId(),admin.getLogin().getEmail(), "Read Only");
        return ResponseEntity.ok().body(staffDTO);
    }

    @PostMapping("/addLogin")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addLoginDetails(@RequestBody Login login, @RequestHeader("Authorization") String token) {
        loginService.addLogin(login);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Login Record", null, login.getEmail(), "Insert Record");
        return ResponseEntity.ok().body("Login Details added Successfully");
    }

    @PostMapping("/addDoctor")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addDoctorDetails(@RequestBody DoctorDTO doctorDTO, @RequestHeader("Authorization") String token) {
        Login login = loginService.getLoginByEmail(doctorDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Doctor doctor = new Doctor(doctorDTO);
        doctor.setLogin(login);

        doctorService.addDoctor(doctor);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Doctor Record", null, doctor.getLogin().getEmail(),"Insert Record");
        return ResponseEntity.ok().body("Doctor Record Added Successfully");
    }

    @PostMapping("/addAdmin")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addAdminDetails(@RequestBody StaffDTO staffDTO, @RequestHeader("Authorization") String token) {
        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Admin admin = new Admin(staffDTO);
        admin.setLogin(login);

        adminService.addAdmin(admin);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin1 = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin1.getAdminId(), email,"Admin Record", null, admin.getLogin().getEmail(), "Insert Record");
        return ResponseEntity.ok().body("Admin Record Added Successfully");
    }

    @PostMapping("/addReceptionist")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> addReceptionistDetails(@RequestBody StaffDTO staffDTO, @RequestHeader("Authorization") String token) {
        Login login = loginService.getLoginByEmail(staffDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login details not found for the provided email.");
        }

        Receptionist receptionist = new Receptionist(staffDTO);
        receptionist.setLogin(login);

        receptionistService.addReceptionist(receptionist);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Receptionist Record", null, receptionist.getLogin().getEmail(),"Insert Record");
        return ResponseEntity.ok().body("Receptionist Record Added Successfully");
    }

    @PostMapping("/deActivateStaff")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> deactivateStaff(@RequestBody ExtraDTO extraDTO, @RequestHeader("Authorization") String token) {
        Login login = loginService.getLoginByEmail(extraDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Staff not found for provided email.");
        }
        login.setStatus(false);

        loginService.setLogin(login);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Login Record", login.getUserId(), extraDTO.getEmail(), "Deactivate User");
        return ResponseEntity.ok().body("Successfully Deactivated Staff Account");
    }

    @PostMapping("/activateStaff")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> activateStaff(@RequestBody ExtraDTO extraDTO, @RequestHeader("Authorization") String token) {
        Login login = loginService.getLoginByEmail(extraDTO.getEmail());
        if (login == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Staff not found for provided email.");
        }
        login.setStatus(true);

        loginService.setLogin(login);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Login Record", login.getUserId(), extraDTO.getEmail(), "Activate User");
        return ResponseEntity.ok().body("Successfully Activated Staff Account");
    }

    @GetMapping("/staffList")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<List<StaffListDTO>> staffList(@RequestHeader("Authorization") String token) {
        List<StaffListDTO> adminListDTOS = adminService.getAdminList();
        List<StaffListDTO> receptionistListDTOS = receptionistService.getRecetionistList();

        List<StaffListDTO> staffListDTOS = new ArrayList<>();
        staffListDTOS.addAll(adminListDTOS);
        staffListDTOS.addAll(receptionistListDTOS);

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Admins and Receptionists List", null, null,"Read Only");

        return ResponseEntity.ok().body(staffListDTOS);
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('admin:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO) {
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String userName = jwtService.extractEmail(token);
        if(!loginService.verifyCurrentPassword(userName, extraDTO.getOldPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
        }

        loginService.updateLogin(userName, extraDTO.getNewPassword());

        Admin admin = adminService.getAdminDetails(userName);
        accessLogsService.accessLogs("Admin", admin.getAdminId(), userName,"Admin Record", admin.getAdminId(), admin.getLogin().getEmail(),"Change Password");
        return ResponseEntity.ok("Password changed Successfully");
    }

    @GetMapping("/accessLogs")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<List<AccessLogs>> accessLogs(@RequestHeader("Authorization" )String token) {
        List<AccessLogs> accessLogs = accessLogsService.getAccessLogList();
        return ResponseEntity.ok().body(accessLogs);
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<AnalyticsDTO> getAnalyticsData(@RequestHeader("Authorization" )String token) {
        AnalyticsDTO analyticsData = analyticsService.generateAnalyticsData();

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);
        Admin admin = adminService.getAdminDetails(email);

        accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Analytics Data", null, null,"Read Only");

        return ResponseEntity.ok().body(analyticsData);
    }

    @GetMapping("/doctorCountBySpeciality")
    @PreAuthorize("hasAuthority('admin:get')")
    public ResponseEntity<Map<String, Integer>> getDoctorCountBySpeciality() {
        List<DoctorListDTO> doctorListDTOS = doctorService.getDoctorList();
        Map<String, Integer> doctorCountBySpeciality = analyticsService.getDoctorCountBySpeciality(doctorListDTOS);
        return ResponseEntity.ok().body(doctorCountBySpeciality);
    }

    @GetMapping("/patient-count-by-gender")
    public ResponseEntity<Map<String, Long>> getPatientCountByGender() {
        Map<String, Long> patientCountByGender = PatientService.getPatientCountByGender();
        return ResponseEntity.ok(patientCountByGender);
    }

    @GetMapping("/patient-count-by-age-group")
    public ResponseEntity<Map<String, Long>> getPatientCountByAgeGroup() {
        Map<String, Long> patientCountByAgeGroup = PatientService.getPatientCountByAgeGroup();
        return ResponseEntity.ok(patientCountByAgeGroup);
    }


    @GetMapping("/appointment-count-by-day")
    public ResponseEntity<Map<String, Integer>> getAppointmentCountByDay() {
        Map<String, Integer> appointmentCountByDay = analyticsService.getAppointmentCountByDay();
        return ResponseEntity.ok(appointmentCountByDay);
    }

    @GetMapping("/patient-count-by-appointment-speciality")
    public ResponseEntity<Map<String, Long>> getPatientCountByAppointmentSpeciality() {
        Map<String, Long> patientCountByAppointmentSpeciality = analyticsService.getPatientCountByAppointmentSpeciality();
        return ResponseEntity.ok(patientCountByAppointmentSpeciality);
    }

}