package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.ExtraDTO;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.dto.DoctorListDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/receptionist")
@PreAuthorize("hasAnyRole('Receptionist', 'Admin')")
public class ReceptionistController {

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginService loginService;

    @PostMapping("/receptionistDetails")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<StaffDTO> getReceptionistDetail(
            @RequestBody ExtraDTO extraDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Receptionist receptionist;
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            receptionist = receptionistService.getReceptionistDetails(extraDTO.getEmail());
        } else {
            receptionist = receptionistService.getReceptionistDetails(userDetails.getUsername());
        }

        StaffDTO staffDTO = new StaffDTO(receptionist);
        return ResponseEntity.ok().body(staffDTO);
    }

    @PostMapping("/addPatient")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> addPatientDetails(@RequestBody Patient patient) {
        patientService.addPatient(patient);
        return ResponseEntity.ok().body("Successfully added New Patient Record");
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAuthority('receptionist:get')")
    public ResponseEntity<Patient> getPatientRecord(@PathVariable("patientId") Integer patientId) {
        Patient patient = patientService.getPatientById(patientId);
        return ResponseEntity.ok().body(patient);
    }

    @PostMapping("/addAppointment/patientId/{patientId}/doctorId/{doctorId}")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> addAppointment(
            @PathVariable("patientId") Integer patientId,
            @PathVariable("doctorId") Integer doctorId,
            @RequestBody Appointment appointment) {
        Doctor doctor = doctorService.findDoctorById(doctorId);
        appointment.setDoctor(doctor);
        int tokenNo = doctor.generateToken();
        if (tokenNo == 0) {
            return ResponseEntity.ok().body("Doctor appointment is full for today");
        }
        appointment.setTokenNo(tokenNo);

        Patient patient = patientService.findPatientById(patientId);
        if(patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patient with given Patient Id");
        }
        appointment.setPatient(patient);

        appointmentService.addAppointment(appointment);
        return ResponseEntity.ok().body("Successfully created a new Appointment. Appointment No: "+ appointment.getTokenNo());
    }

    @PostMapping("/resetDoctorTokenNo/{doctorId}")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> resetDoctorTokenNo(@PathVariable Integer doctorId) {
        Doctor doctor = doctorService.findDoctorById(doctorId);
        doctor.tokenReset();
        return ResponseEntity.ok().body("Doctor Token Number reset successfully");
    }

    @GetMapping("/doctorList")
    @PreAuthorize("hasAnyAuthority('receptionist:get', 'admin:get')")
    public ResponseEntity<List<DoctorListDTO>> doctorList() {
        List<DoctorListDTO> doctorListDTOS = doctorService.getDoctorList();
        return ResponseEntity.ok().body(doctorListDTOS);
    }

    @PostMapping("/updateReceptionist")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> updateReceptionist(
            @RequestBody StaffDTO staffDTO,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) {
        Receptionist receptionist;

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            receptionist = receptionistService.getReceptionistDetails(staffDTO.getEmail());
        }else {
            if(token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String email = jwtService.extractEmail(token);
            receptionist = receptionistService.getReceptionistDetails(email);
        }

        receptionist.setMobileNo(staffDTO.getMobileNo());
        receptionistService.updateReceptionist(receptionist);
        return ResponseEntity.ok().body("Successfully updated Receptionist Details");
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            Login login = loginService.getLoginByEmail(extraDTO.getEmail());
            if(login == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Receptionist found with given Email");
            }
            loginService.updateLogin(extraDTO.getEmail(), extraDTO.getNewPassword());
        }
        else {
            if(token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String userName = jwtService.extractEmail(token);
            if(!loginService.verifyCurrentPassword(userName, extraDTO.getOldPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
            }

            loginService.updateLogin(userName, extraDTO.getNewPassword());
        }

        return ResponseEntity.ok("Password changed Successfully");
    }
}