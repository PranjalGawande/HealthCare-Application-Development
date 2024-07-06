package com.example.HAD.Backend.service;


import com.example.HAD.Backend.entities.Login;
import com.example.HAD.Backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String authenticate(Login request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Login login = loginRepository.findByEmail(request.getEmail());
        String token = jwtService.generateToken(login);

        return token;
    }

    public void addLogin(Login login) {
        login.setPassword(passwordEncoder.encode(login.getPassword()));
        loginRepository.save(login);
    }

    public Login getLoginByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    public void setLogin(Login login) {
        loginRepository.updateLoginStatus(login.getUserId(), login.getStatus());
    }

    public void updateLogin(String email, String password) {
        password = passwordEncoder.encode(password);
        loginRepository.updatePassword(email, password);
    }

    public boolean verifyCurrentPassword(String userName, String oldPassword) {
        Login login = getLoginByEmail(userName);

        String storedPassword = login.getPassword();
        return passwordEncoder.matches(oldPassword, storedPassword);
    }
}