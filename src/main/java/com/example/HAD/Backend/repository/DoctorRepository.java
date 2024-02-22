package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Doctor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query("SELECT d FROM Doctor d WHERE d.login.email = :email")
    Doctor findByLoginEmail(@Param("email") String email);

    @Query("SELECT d FROM Doctor d WHERE d.doctorId = :doctorId")
    Doctor findDoctorById(@Param("doctorId") Integer doctorId);

    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.speciality= :speciality, d.mobileNo= :mobileNo, d.experience = :experience WHERE d.doctorId =:doctorId")
    void updateDoctor(@Param("doctorId") Integer doctorId, @Param("speciality") String speciality, @Param("mobileNo") String mobileNo,@Param("experience") Integer experience);
}
