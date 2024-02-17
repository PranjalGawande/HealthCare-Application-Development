package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Staff;
import com.example.HAD.Backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public Staff getStaffDetails(String email) {
        return staffRepository.findByLoginEmail(email);
    }
}
