package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Receptionist;
import com.example.HAD.Backend.repository.ReceptionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceptionistService {

    @Autowired
    private ReceptionistRepository receptionistRepository;
    public Receptionist getReceptionistDetails(String email) {
        return receptionistRepository.findByLoginEmail(email);
    }
}
