package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    @Query("SELECT s FROM Staff s WHERE s.login.email = :email")
    Staff findByLoginEmail(@Param("email") String email);
}
