package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Admin;
import com.example.HAD.Backend.dto.StaffListDTO;
import com.example.HAD.Backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin getAdminDetails(String email) {
        return adminRepository.findByLoginEmail(email);
    }

    public void addAdmin(Admin staff) {
        adminRepository.save(staff);
    }

    public List<StaffListDTO> getAdminList() {
        return adminRepository.getAdmins();
    }
}