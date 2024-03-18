package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Admin;
import com.example.HAD.Backend.dto.StaffListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    @Query("SELECT s FROM Admin s WHERE s.login.email = :email")
    Admin findByLoginEmail(@Param("email") String email);

    @Query("SELECT new com.example.HAD.Backend.dto.StaffListDTO(s.name, l.email, l.role) " +
            "FROM Admin s JOIN s.login l")
    List<StaffListDTO> getAdmins();
}
