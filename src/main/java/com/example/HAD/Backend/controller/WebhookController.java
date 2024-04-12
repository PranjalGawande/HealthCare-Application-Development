package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.entities.Patient;
import com.example.HAD.Backend.service.AbdmService;
import com.example.HAD.Backend.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:9191")
public class WebhookController {

    @Autowired
    private AbdmService abdmService;

    @Autowired
    private PatientService patientService;
    @PostMapping("/v0.5/users/auth/on-fetch-modes")
    public void authFetchModes(@RequestBody Map<String, Object> body, HttpSession session) throws JsonProcessingException {
        if (body == null || body.containsKey("error")) {
            System.out.println("An error occurred while processing the Aadhaar OTP request.");
            return;
        }
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(body));
    }

    @PostMapping("/v0.5/users/auth/on-init")
    public ResponseEntity<?> userAuthInit(@RequestBody Map<String, Object> body, HttpSession session) {
        if (body == null || body.containsKey("error") && body.get("error") != null) {
            System.out.println("An error occurred while processing the Aadhaar OTP request.");
            return ResponseEntity.badRequest().body("Error processing the request");
        }

        try {
            Map<String, Object> authMap = (Map<String, Object>) body.get("auth");
            if (authMap == null) {
                System.out.println("The 'auth' section is missing in the response.");
                return ResponseEntity.badRequest().body("Missing 'auth' section in the request");
            }

            String txnId = (String) authMap.get("transactionId");
            if (txnId == null || txnId.isEmpty()) {
                System.out.println("Transaction ID is missing in the response.");
                return ResponseEntity.badRequest().body("Transaction ID is missing");
            }

            System.out.println("txnId: " + txnId);
            System.out.println("OTP has been sent to your registered mobile number...");

            // Return transaction ID to the frontend
            return ResponseEntity.ok().body(Map.of("transactionId", txnId));

        } catch (ClassCastException e) {
            System.out.println("An error occurred due to incorrect data format.");
            return ResponseEntity.badRequest().body("Incorrect data format");
        } catch (Exception e) {
            System.out.println("An error occurred while processing the verification OTP request.");
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    @PostMapping("/v0.5/users/auth/on-confirm")
    public ResponseEntity<?> confirmAuthInit(@RequestBody Map<String, Object> body, HttpSession session) {
        if (body == null || body.containsKey("error") && body.get("error") != null) {
            System.out.println("An error occurred during the authentication process.");
            return ResponseEntity.badRequest().body("Authentication process error.");
        }

        try {
            Object authRaw = body.get("auth");
            if (!(authRaw instanceof Map)) {
                System.out.println("Authentication information is missing or invalid.");
                return ResponseEntity.badRequest().body("Authentication information is missing or invalid.");
            }
            Map<String, Object> authInfo = (Map<String, Object>) authRaw;

            String accessToken = (String) authInfo.get("accessToken");
            if (accessToken == null) {
                System.out.println("Access token is missing.");
                return ResponseEntity.badRequest().body("Access token is missing.");
            }

            Object patientRaw = authInfo.get("patient");
            if (!(patientRaw instanceof Map)) {
                System.out.println("Patient information is missing or invalid.");
                return ResponseEntity.badRequest().body("Patient information is missing or invalid.");
            }
            Map<String, Object> patientInfo = (Map<String, Object>) patientRaw;

            String abhaId = (String) patientInfo.get("id");
            String name = (String) patientInfo.get("name");
            String gender = (String) patientInfo.get("gender");
            Integer yearOfBirth = (Integer) patientInfo.get("yearOfBirth");
            Integer monthOfBirth = (Integer) patientInfo.get("monthOfBirth");
            Integer dayOfBirth = (Integer) patientInfo.get("dayOfBirth");

            if (yearOfBirth == null || monthOfBirth == null || dayOfBirth == null) {
                System.out.println("Date of birth components are missing.");
                return ResponseEntity.badRequest().body("Date of birth components are missing.");
            }
            LocalDate dateOfBirth = LocalDate.of(yearOfBirth, monthOfBirth, dayOfBirth);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String dob = dateOfBirth.format(formatter);

            ObjectMapper mapper = new ObjectMapper();
            System.out.println(mapper.writeValueAsString(Map.of(
                    "accessToken", accessToken,
                    "abhaId", abhaId,
                    "name", name,
                    "gender", gender,
                    "dateOfBirth", dob
            )));

//            Patient patient = new Patient();
//            patient.setAbhaId(abhaId);
//            patient.setAccessToken(accessToken);

            patientService.updateAbhaAddress(abhaId, accessToken);
            // Return all relevant information to the frontend
            return ResponseEntity.ok().body("Access Token added to patient record in Db.");

        } catch (Exception e) {
            System.out.println("Failed to process patient data: " + e.getMessage());
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
}