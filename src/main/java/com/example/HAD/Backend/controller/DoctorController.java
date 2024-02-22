package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.MedicalRecords;
import com.example.HAD.Backend.bean.Patient;
import com.example.HAD.Backend.dto.MedicalRecordsDTO;
import com.example.HAD.Backend.service.DoctorService;
import com.example.HAD.Backend.service.MedicalRecordsService;
import com.example.HAD.Backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/doctor")
public class DoctorController {

    private Doctor doctor;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedicalRecordsService medicalRecordsService;

    public Doctor getDoctorDetails(String email) {
        doctor = doctorService.getDoctorDetailsByEmail(email);
        return doctor;
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Patient> getPatientRecord(@PathVariable("patientId") Integer patientId) {
        Patient patient = patientService.getPatientById(patientId);
        return ResponseEntity.ok().body(patient);
    }

    @GetMapping("/record/{patientId}")
    public ResponseEntity<List<MedicalRecordsDTO>> addPatientConsultationHistory(@PathVariable("patientId") Integer patientId) {
        List<MedicalRecords> medicalRecords = medicalRecordsService.getPatientMedicalHistory(doctor.getDoctorId(), patientId);

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

    @PostMapping("/{patientId}/addPatientRecord")
    public ResponseEntity<String> addPatientConsultationRecord(@RequestBody MedicalRecords request, @PathVariable("patientId") Integer patientId) {
        if (request == null || doctor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to add this Record");
        }

        MedicalRecords medicalRecords = new MedicalRecords();

        Patient patient = patientService.getPatientById(patientId);
        medicalRecords.setPatient(patient);
        medicalRecords.setDoctor(doctor);

        medicalRecords.setMedicine(request.getMedicine());
        medicalRecords.setPulse(request.getPulse());
        medicalRecords.setBloodPressure(request.getBloodPressure());
        medicalRecords.setOxygenLevel(request.getOxygenLevel());
        medicalRecords.setSymptoms(request.getSymptoms());

        medicalRecordsService.addPatientConsultation(medicalRecords);
        return ResponseEntity.ok().body("Medical Records added successfully");
    }
}