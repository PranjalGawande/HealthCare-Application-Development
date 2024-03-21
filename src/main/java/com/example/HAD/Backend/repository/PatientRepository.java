package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    Patient findPatientByPatientId(Integer patientId);
}
