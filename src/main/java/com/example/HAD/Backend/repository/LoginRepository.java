package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {

    Login findByEmailAndPassword(String email, String password);
}
