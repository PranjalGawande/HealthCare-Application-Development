package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.Receptionist;
import com.example.HAD.Backend.dto.StaffListDTO;
import com.example.HAD.Backend.repository.ReceptionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptionistService {

    @Autowired
    ReceptionistRepository receptionistRepository;
    public Receptionist getReceptionistDetails(String email) {
        return receptionistRepository.findByEmail(email);
    }

    public void addReceptionist(Receptionist receptionist) {
        receptionistRepository.save(receptionist);
    }

    public List<StaffListDTO> getRecetionistList() {
        return receptionistRepository.getReceptionists();
    }

    public void updateReceptionist(Receptionist receptionist) {
        receptionistRepository.updateReceptionist(receptionist.getMobileNo(), receptionist.getLogin().getEmail());
    }
}
