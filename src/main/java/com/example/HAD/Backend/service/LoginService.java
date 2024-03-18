package com.example.HAD.Backend.service;


import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.repository.LoginRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login userLogin(Login login) {
        Login record = loginRepository.findByEmail(login.getEmail());
        if (record != null) {
            boolean validate = BCrypt.checkpw(login.getPassword(), record.getPassword());
            if (!validate) {
                record = null;
            }
        }
        return record;
    }

    public void addLogin(Login login) {
        String hashed = BCrypt.hashpw(login.getPassword(), BCrypt.gensalt());
        login.setPassword(hashed);

        loginRepository.save(login);
    }

    public Login getLoginByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    public void setLogin(Login login) {
        loginRepository.updateLoginDetail(login.getUserId(), login.getEmail());
    }

    public Login getLoginByRole() {
        String role = "superAdmin";
        return loginRepository.findByRole(role);
    }
}