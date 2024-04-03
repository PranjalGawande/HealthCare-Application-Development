package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.ExtraDTO;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.dto.MedicalRecordsDTO;
import com.example.HAD.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/doctor")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedicalRecordsService medicalRecordsService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginService loginService;

    @PostMapping("/doctorDetails")
    @PreAuthorize("hasAnyAuthority('doctor:post')")
    public ResponseEntity<DoctorDTO> getDoctorDetails(@RequestBody ExtraDTO extraDTO,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        Doctor doctor;
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            doctor = doctorService.getDoctorDetailsByEmail(extraDTO.getEmail());
        }
        else {
            String email = userDetails.getUsername();
            doctor = doctorService.getDoctorDetailsByEmail(email);
        }

        DoctorDTO doctorDTO = new DoctorDTO(doctor);
        return ResponseEntity.ok().body(doctorDTO);
    }

    @GetMapping("/history/{patientId}")
    @PreAuthorize("hasAuthority('doctor:get')")
    public ResponseEntity<List<MedicalRecordsDTO>> PatientConsultationHistory(
            @PathVariable("patientId") Integer patientId,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<MedicalRecords> medicalRecords;

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
           medicalRecords = medicalRecordsService.getPatientHistory(patientId);
        }
        else {
            Doctor doctor = doctorService.getDoctorDetailsByEmail(userDetails.getUsername());
            // In case of doctor, treat patientId as tokenNo
            Optional<Appointment> appointmentValue = appointmentService.getAppointmentBytokenNo(doctor.getDoctorId(), patientId);
            Appointment appointment = appointmentValue.orElseThrow(()-> new RuntimeException("Unable to find the given Token Number"));

            medicalRecords = medicalRecordsService.getPatientMedicalHistory(userDetails.getUsername(), appointment.getPatient().getPatientId());
        }

        List<MedicalRecordsDTO> medicalRecordsDTO = new ArrayList<>();
        for (MedicalRecords record: medicalRecords) {
            medicalRecordsDTO.add(new MedicalRecordsDTO(record));
        }

        if (medicalRecordsDTO.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok().body(medicalRecordsDTO);
        }
    }

    @PostMapping("/addPatientRecord/{tokenNo}")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> addPatientConsultationRecord(
            @RequestBody MedicalRecords request,
            @PathVariable Integer tokenNo,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) throws IllegalAccessException {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin cannot add medical records");
        }

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);

        Doctor doctor = doctorService.getDoctorDetailsByEmail(email);

        Optional<Appointment> appointmentValue = appointmentService.getAppointmentBytokenNo(doctor.getDoctorId(), tokenNo);
        Appointment appointment = appointmentValue.orElseThrow(()-> new RuntimeException("Appointment with given Id cannot be found"));

        Patient patient = patientService.getPatientById(appointment.getPatient().getPatientId());

        boolean isRequestNotNull = true;
        Field[] fields = MedicalRecords.class.getDeclaredFields();

        Set<String> variables = new HashSet<>();
        variables.add("bloodPressure");
        variables.add("oxygenLevel");
        variables.add("pulse");
        variables.add("symptoms");

        for ( Field field : fields) {
            field.setAccessible(true);
            if (variables.contains(field.getName())) {
                Object value = field.get(request);
                if (value == null) {
                    isRequestNotNull = false;
                    break;
                }
            }
        }

        if (isRequestNotNull) {
            MedicalRecords medicalRecords = new MedicalRecords();
            medicalRecords.setPatient(patient);
            medicalRecords.setDoctor(doctor);

            List<Prescription> prescriptions = new ArrayList<>();
            for (Prescription prescriptionData : request.getPrescriptions()) {
                Prescription prescription = new Prescription();
                prescription.setMedicalRecord(medicalRecords);
                prescription.setMedicine(prescriptionData.getMedicine());
                prescription.setDosage(prescriptionData.getDosage());
                prescription.setFrequency(prescriptionData.getFrequency());
                prescription.setDuration(prescriptionData.getDuration());
                prescriptions.add(prescription);
            }
            medicalRecords.setPrescriptions(prescriptions);

            medicalRecords.setPulse(request.getPulse());
            medicalRecords.setBloodPressure(request.getBloodPressure());
            medicalRecords.setOxygenLevel(request.getOxygenLevel());
            medicalRecords.setSymptoms(request.getSymptoms());

            appointmentService.updateAppointment(appointment.getAppointmentId(), "done");
            medicalRecordsService.addPatientConsultation(medicalRecords);
            return ResponseEntity.ok().body("Medical Records added successfully");
        } else {
            appointmentService.updateAppointment(appointment.getAppointmentId(), "absent");
            return ResponseEntity.ok().body("Patient was absent");
        }
    }

    @PostMapping("/updateDoctor")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> updateDoctor(
            @RequestBody DoctorDTO doctorDTO,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token) {
        Doctor doctor;
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            doctor = doctorService.getDoctorDetailsByEmail(doctorDTO.getEmail());
        }
        else {
            String email = userDetails.getUsername();
            doctor = doctorService.getDoctorDetailsByEmail(email);
        }

        if(doctor.getSpeciality() != null) doctor.setSpeciality(doctorDTO.getSpeciality());
        if(doctor.getExperience() != null) doctor.setExperience(doctorDTO.getExperience());
        if(doctor.getMobileNo() != null)   doctor.setMobileNo(doctorDTO.getMobileNo());
        if(doctor.getTokenMax() != null) doctor.setTokenMax(doctorDTO.getTokenMax());

        doctorService.updateDoctor(doctor);
        return ResponseEntity.ok().body("Successfully updated Doctor Details");
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            Login login = loginService.getLoginByEmail(extraDTO.getEmail());
            if(login == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Doctor found with given Email");
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