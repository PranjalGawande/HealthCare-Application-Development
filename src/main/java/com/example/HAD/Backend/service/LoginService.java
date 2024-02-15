package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login docLogin(Login login) {
        return loginRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
    }

    public Login RecpLogin(Login login) {
        return loginRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
    }
}
