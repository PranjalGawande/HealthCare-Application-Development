package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.AccessLogs;
import com.example.HAD.Backend.repository.AccessLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AccessLogsService {

    @Autowired
    private AccessLogsRepository accessLogsRepository;

    public void accessLogs(String roleType, Integer userId, String email, String modifiedEntityType, Integer accessedRecordId, String accessedEmailId, String action) {

        AccessLogs accessLogs = new AccessLogs();
        accessLogs.setRoleType(roleType);
        accessLogs.setUserId(userId);
        accessLogs.setEmail(email);
        accessLogs.setModifiedEntityType(modifiedEntityType);
        accessLogs.setAccessedRecordId(accessedRecordId);
        accessLogs.setAccessedEmailId(accessedEmailId);
        accessLogs.setAction(action);
        accessLogs.setTimeStamp(LocalTime.now());
        accessLogs.setDate(LocalDate.now());
        accessLogsRepository.save(accessLogs);
    }

    public List<AccessLogs> getAccessLogList() {
        return accessLogsRepository.findAll();
    }
}
