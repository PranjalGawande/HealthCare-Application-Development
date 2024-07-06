package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.Login;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {
    @Query("SELECT l from Login l WHERE l.email = :email AND l.password = :password")
    Login findByEmailAndPassword(String email, String password);

    @Query("SELECT l from Login l WHERE l.email = :email")
    Login findByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("UPDATE Login l SET l.status = :status WHERE l.userId = :id")
    void updateLoginStatus(@Param("id") Integer id, @Param("status") boolean status);

    @Transactional
    @Modifying
    @Query("UPDATE Login l SET l.password = :password WHERE l.email = :email")
    void updatePassword(@Param("email") String email, @Param("password") String password);
}
