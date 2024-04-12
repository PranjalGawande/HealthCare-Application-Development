package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Patient;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Modifying
    @Transactional
    @Query("UPDATE Patient p SET p.accessToken=:accessToken WHERE p.abhaId=:abhaId")
    void updateAbhaAddress(@Param("abhaId") String abhaId,@Param("accessToken") String accessToken);
}
