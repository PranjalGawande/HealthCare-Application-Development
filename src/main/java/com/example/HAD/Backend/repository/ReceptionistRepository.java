package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Receptionist;
import com.example.HAD.Backend.dto.StaffListDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Integer> {

    @Query("SELECT r FROM Receptionist r WHERE r.login.email= :email")
    Receptionist findByEmail(@Param("email") String email);

    @Query("SELECT new com.example.HAD.Backend.dto.StaffListDTO(r.name, l.email, l.role, l.status) " +
            "FROM Receptionist r JOIN r.login l")
    List<StaffListDTO> getReceptionists();

    @Transactional
    @Modifying
    @Query("UPDATE Receptionist r SET r.mobileNo= :mobileNo WHERE r.login.email= :email")
    void updateReceptionist(@Param("mobileNo") String mobileNo, @Param("email") String email);
}
