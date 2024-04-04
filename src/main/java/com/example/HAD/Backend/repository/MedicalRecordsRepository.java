package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.MedicalRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordsRepository extends JpaRepository<MedicalRecords, Integer> {

    @Query("SELECT m FROM MedicalRecords m WHERE m.appointment.appointmentId IN " +
            "(SELECT a.appointmentId FROM Appointment a WHERE a.doctor.doctorId =:doctorId AND a.patient.patientId =:patientId )")
    List<MedicalRecords> getPatientHistory(@Param("doctorId") Integer doctorId, @Param("patientId") Integer patientId);

    @Query("SELECT m FROM MedicalRecords m WHERE m.appointment.appointmentId IN " +
            "(SELECT a.appointmentId FROM Appointment a WHERE a.patient.patientId =:patientId)")
    List<MedicalRecords> getPatientMedicalHistory(Integer patientId);
}
