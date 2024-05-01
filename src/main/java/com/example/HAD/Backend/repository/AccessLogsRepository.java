package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.AccessLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessLogsRepository extends JpaRepository<AccessLogs, Integer> {
}
