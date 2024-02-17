package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.bean.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {

    Login findByEmailAndPassword(String email, String password);
}
