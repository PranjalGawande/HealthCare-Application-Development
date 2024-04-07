package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.entities.Doctor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
//    @Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId =:doctorId AND a.patient.patientId =:patientId AND a.status =:status")
//    Appointment getAppointmentDetails(@Param("doctorId") Integer doctorId,@Param("patientId") Integer patientId, @Param("status") String status);

    @Transactional
    @Modifying
    @Query("UPDATE Appointment a SET a.status =:status WHERE a.appointmentId =:appointmentId")
    void updateAppointmentDetail(@Param("appointmentId") Integer appointmentId,@Param("status") String status);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId =:doctorId AND a.tokenNo =:tokenNo AND a.status =:status")
    Optional<Appointment> getAppointmentByToken(@Param("doctorId") Integer doctorId,@Param("tokenNo") Integer tokenNo,@Param("status") String status);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentId IN " +
            "(SELECT mr.appointment.appointmentId FROM MedicalRecords mr WHERE mr.appointment.patient.patientId=:patientId)")
    List<Appointment> findAppointmentListByPatientAbhaId(@Param("patientId") Integer patientId);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.doctorId = :doctorId")
    long countByDoctorId(@Param("doctorId") Integer doctorId);
    @Override
    List<Appointment> findAll();
}
