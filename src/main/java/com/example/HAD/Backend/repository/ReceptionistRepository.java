package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.print.DocFlavor;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Integer> {

    @Query("SELECT r FROM Receptionist r WHERE r.login.email = :email")
    Receptionist findByLoginEmail(@Param("email") String email);
}
