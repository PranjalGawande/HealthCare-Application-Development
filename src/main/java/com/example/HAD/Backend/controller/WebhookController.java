package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.TransactionIdDTO;
import com.example.HAD.Backend.entities.Patient;
import com.example.HAD.Backend.service.AbdmService;
import com.example.HAD.Backend.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:9191")
public class WebhookController {

    private String txnId = null;

    private Map<String, String> patientData = null;

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

            txnId = (String) authMap.get("transactionId");
            if (txnId == null || txnId.isEmpty()) {
                System.out.println("Transaction ID is missing in the response.");
                return ResponseEntity.badRequest().body("Transaction ID is missing");
            }

//            transactionIdDTO = new TransactionIdDTO();
//            transactionIdDTO.setTransactionId(txnId);

            System.out.println("txnId: " + txnId);
            System.out.println("OTP has been sent to your registered mobile number...");
            session.setAttribute("transactionId", txnId);

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

    @GetMapping("/getTransactionId")
    public ResponseEntity<?> getTransactionId() {
        return ResponseEntity.ok().body(Map.of("transactionId", txnId));
    }

    @PostMapping("/v0.5/users/auth/on-confirm")
    public ResponseEntity<?> confirmAuthInit(@RequestBody Map<String, Object> body, HttpSession session) {
        if (body == null || body.containsKey("error") && body.get("error") != null) {
            System.out.println("An error occurred during the authentication process.");
            return ResponseEntity.badRequest().body("Authentication process error.");
        }

        try {
            Map<String, Object> auth = (Map<String, Object>) body.get("auth");
            if (auth == null) {
                System.out.println("Auth is missing.");
                return ResponseEntity.badRequest().body("Auth is missing.");
            }
            String accessToken = (String) auth.get("accessToken");

            Map<String, Object> patientInfo = (Map<String, Object>) auth.get("patient");
            if (patientInfo == null) {
                System.out.println("Patient information is missing.");
                return ResponseEntity.badRequest().body("Patient information is missing.");
            }
            String abhaAddress = (String) patientInfo.get("id");
            String name = (String) patientInfo.get("name");
            String gender = (String) patientInfo.get("gender");
            Integer yearOfBirth = (Integer) patientInfo.get("yearOfBirth");
            Integer monthOfBirth = (Integer) patientInfo.get("monthOfBirth");
            Integer dayOfBirth = (Integer) patientInfo.get("dayOfBirth");

            List<Map<String, Object>> identifiers = (List<Map<String, Object>>) patientInfo.get("identifiers");
            if (identifiers == null) {
                System.out.println("Patient Identifier information is missing.");
                return ResponseEntity.badRequest().body("Patient Identifier information is missing.");
            }
            String mobileNumber = null;
            String abhaNumber = null;
            for (Map<String, Object> identifier : identifiers) {
                if ("MOBILE".equals(identifier.get("type"))) {
                    mobileNumber = (String) identifier.get("value");
                } else if ("NDHM_HEALTH_NUMBER".equals(identifier.get("type"))) {
                    abhaNumber = (String) identifier.get("value");
                }
            }
            if (mobileNumber == null || abhaNumber == null) {
                System.out.println("Patient mobile number or abha number is missing.");
                return ResponseEntity.badRequest().body("Patient mobile number or abha number is missing.");
            }

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
                    "abhaNumber", abhaNumber,
                    "abhaAddress", abhaAddress,
                    "name", name,
                    "gender", gender,
                    "dateOfBirth", dob,
                    "mobileNumber", mobileNumber
            )));

            Patient patient = new Patient();
            patient.setName(name);
            patient.setAbhaId(abhaAddress);
            patient.setMobileNo(mobileNumber);
            patient.setDob(dateOfBirth);
            patient.setGender(gender);
            patient.setAccessToken(accessToken);
            patientService.addPatient(patient);

            patientData = Map.of(
                    "abhaNumber", abhaNumber,
                    "abhaAddress", abhaAddress,
                    "name", name,
                    "gender", gender,
                    "dateOfBirth", dob,
                    "mobileNumber", mobileNumber
            );
            System.out.println("From on-confirm" + patientData);
//            patientService.updateAbhaAddress(abhaAddress, accessToken);
            // Return all relevant information to the frontend
            return ResponseEntity.ok().body("Send request on get patientInfo...");

        } catch (ClassCastException | DateTimeException | NullPointerException | JsonProcessingException e) {
            System.out.println("Failed to process patient data: " + e.getMessage());
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/getPatientInfo")
    public ResponseEntity<?> getPatientInfo() {
        System.out.println("From getPatientInfo" + patientData);
        return ResponseEntity.ok().body(patientData);
    }
}