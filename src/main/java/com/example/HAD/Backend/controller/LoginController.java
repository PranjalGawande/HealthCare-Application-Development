package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.Token;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/admin")
    public ResponseEntity<Token> authenticateAdmin(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/receptionist")
    public ResponseEntity<Token> authenticateReceptionist(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/doctor")
    public ResponseEntity<Token> authenticateDoctor(@RequestBody Login request) {
        Token token = new Token(loginService.authenticate(request));
        return ResponseEntity.ok().body(token);
    }
}