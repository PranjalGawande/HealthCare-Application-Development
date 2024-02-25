package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.dto.DoctorListDTO;
import com.example.HAD.Backend.dto.StaffListDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {
    @Query("SELECT l from Login l WHERE l.email = :email AND l.password = :password")
    Login findByEmailAndPassword(String email, String password);

    @Query("SELECT l from Login l WHERE l.email = :email")
    Login findByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("UPDATE Login l SET l.email = :email WHERE l.userId = :id")
    void updateLoginDetail(@Param("id") Integer id, @Param("email") String email);

    @Query("SELECT new com.example.HAD.Backend.dto.DoctorListDTO(d.name, l.email, d.speciality) " +
            "FROM Doctor d JOIN d.login l")
    List<DoctorListDTO> getDoctors();

    @Query("SELECT new com.example.HAD.Backend.dto.StaffListDTO(s.name, l.email, l.role) " +
            "FROM Staff s JOIN s.login l")
    List<StaffListDTO> getStaffs();
}
