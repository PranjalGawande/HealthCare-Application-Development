package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query("SELECT d FROM Doctor d WHERE d.login.email = :email")
    Doctor findByLoginEmail(@Param("email") String email);
}
