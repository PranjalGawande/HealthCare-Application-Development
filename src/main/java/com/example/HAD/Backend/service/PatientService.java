package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.Patient;
import com.example.HAD.Backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.Period;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient getPatientById(Integer patientId) {
        return  patientRepository.findPatientByPatientId(patientId);
    }

    public void addPatient(Patient patient) {
        patientRepository.save(patient);
    }

    public Patient getPatientByAbhaId(String abhaId) {
        return patientRepository.findPatientByAbhaId(abhaId);
    }


    public Map<String, Long> getPatientCountByAgeGroup() {
        // Fetch patient data from repository
        List<Patient> patients = patientRepository.findAll();

        // Create a map to store patient count for each age group
        Map<String, Long> patientCountByAgeGroup = new HashMap<>();

        // Define age groups
        int[] ageRanges = {0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100};

        // Iterate through the patients and categorize them into age groups
        for (int i = 0; i < ageRanges.length - 1; i++) {
            int lowerBound = ageRanges[i];
            int upperBound = ageRanges[i + 1];
            String ageGroup = lowerBound + "-" + upperBound;
            long count = patients.stream()
                    .filter(patient -> calculateAge(patient.getDob()) >= lowerBound && calculateAge(patient.getDob()) < upperBound)
                    .count();
            patientCountByAgeGroup.put(ageGroup, count);
        }

        return patientCountByAgeGroup;
    }

    private int calculateAge(Calendar dateOfBirth) {
        LocalDate currentDate = LocalDate.now();
        LocalDate birthDate = LocalDate.of(
                dateOfBirth.get(Calendar.YEAR),
                dateOfBirth.get(Calendar.MONTH) + 1, // Calendar.MONTH is zero-based
                dateOfBirth.get(Calendar.DAY_OF_MONTH)
        );
        return Period.between(birthDate, currentDate).getYears();
    }

    public Map<String, Long> getPatientCountByGender() {
        // Fetch patient data from repository
        List<Patient> patients = patientRepository.findAll();

        // Create a map to store patient count for each gender
        Map<String, Long> patientCountByGender = new HashMap<>();

        // Iterate through the patients and aggregate the count for each gender
        for (Patient patient : patients) {
            String gender = patient.getGender();
            patientCountByGender.put(gender, patientCountByGender.getOrDefault(gender, 0L) + 1);
        }

        return patientCountByGender;
    }

}