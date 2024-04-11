package com.example.HAD.Backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:9191")
public class WebhookController {

    @PostMapping("/v0.5/users/auth/on-fetch-modes")
    public ResponseEntity<String> handleWebhook(@RequestBody String body, HttpServletRequest request) {
        System.out.println("Received webhook with body: " + body);
        return ResponseEntity.ok("Received");
    }
}
