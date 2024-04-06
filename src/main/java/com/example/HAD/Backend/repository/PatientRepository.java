package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    Patient findPatientByPatientId(Integer patientId);

    @Query("SELECT p FROM Patient p WHERE p.abhaId =:abhaId")
    Patient findPatientByAbhaId(String abhaId);

    @Override
    long count();

    @Override
    List<Patient> findAll();
}
