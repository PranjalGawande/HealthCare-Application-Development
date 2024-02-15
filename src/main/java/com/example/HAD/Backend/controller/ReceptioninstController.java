package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.bean.Receptionist;
import com.example.HAD.Backend.service.ReceptionistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/receptionist")
public class ReceptioninstController {

    @Autowired
    private ReceptionistService receptionistService;
    public Receptionist getReceptionistDetails(String email) {
        Receptionist receptionist = receptionistService.getReceptionistDetails(email);
        return receptionist;
    }
}
