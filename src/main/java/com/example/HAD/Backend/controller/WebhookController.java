package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.entities.Patient;
import com.example.HAD.Backend.service.AbdmService;
import com.example.HAD.Backend.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import org.aspectj.asm.IProgramElement;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:9191")
public class WebhookController {

    private JSONObject resultJson = null;

    private Map<String, String> patientData = null;

    @Autowired
    private PatientService patientService;

//    @Autowired
//    private SseController sseController;

    @PostMapping("/v0.5/users/auth/on-fetch-modes")
    public void authFetchModes(@RequestBody Map<String, Object> body) throws JsonProcessingException {
        if (body == null || body.containsKey("error")) {
            System.out.println("An error occurred while processing the Aadhaar OTP request.");
            return;
        }
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(body));
    }

    @PostMapping("/v0.5/users/auth/on-init")
    public void userAuthInit(@RequestBody String body) {
        try {
            resultJson = new JSONObject();
            if (body == null) {
                System.err.println("ABDM Server did not send any response...");

                resultJson.put("transactionId", JSONObject.NULL);
                JSONObject errorObject = new JSONObject();
                errorObject.put("code", 911);
                errorObject.put("message", "ABDM Server did not send any response...");
                resultJson.put("error", errorObject);
            } else {
                JSONObject jsonObject = new JSONObject(body);
                JSONObject auth = jsonObject.optJSONObject("auth");
                if (auth != null) {
                    String transactionId = auth.getString("transactionId");
                    System.out.println("TransactionId as received by authOnInit callback api: " + transactionId);

                    resultJson.put("transactionId", transactionId);
                    resultJson.put("error", JSONObject.NULL);
                } else {
                    JSONObject error = jsonObject.getJSONObject("error");
                    String errorCode = error.getString("code");
                    String errorMessage = error.getString("message");
                    System.err.println("Error Code: " + errorCode + " received with message " + errorMessage);

                    resultJson.put("transactionId", JSONObject.NULL);
                    JSONObject errorObject = new JSONObject();
                    errorObject.put("code", errorCode);
                    errorObject.put("message", errorMessage);
                    resultJson.put("error", errorObject);
                }
                System.out.println("Printed from <userAuthInit>" + resultJson.toString());
            }
        } catch (JSONException je) {
            System.err.println(je.getMessage());
        }
    }

    @GetMapping("/getTransactionId")
    public ResponseEntity<?> getTransactionId() {
        try {
            System.out.println("Printed from <getTransactionId>: " + (resultJson != null ? resultJson.toString() : "null"));

            if (resultJson == null) {
                JSONObject errorResponse = new JSONObject();
                errorResponse.put("error", "Webhooks.site is not receiving callbacks!!!");
                errorResponse.put("transactionId", JSONObject.NULL);
                return ResponseEntity.badRequest().body(errorResponse.toString());
            }
            return ResponseEntity.ok(resultJson.toString());
        } catch (JSONException je) {
            System.err.println(je.getMessage());
            return ResponseEntity.internalServerError().body("{\"error\": \"Critical JSON processing error...\"}");
        }
    }
    @PostMapping("/v0.5/users/auth/on-confirm")
    public void confirmAuthInit(@RequestBody Map<String, Object> body) {

            try {
                if (body == null) {
                    System.err.println("ABDM Server did not send any response...");

                    resultJson.put("transactionId", JSONObject.NULL);
                    JSONObject errorObject = new JSONObject();
                    errorObject.put("code", 911);
                    errorObject.put("message", "ABDM Server did not send any response...");
                    resultJson.put("error", errorObject);
                } else {

                    JSONObject requestBody = new JSONObject(body);

                    JSONObject auth = requestBody.optJSONObject("auth");
                    if (auth == null) {
                        System.err.println("Auth is missing in ABDM response DB ot updated...");
                    } else {

                        String accessToken = auth.optString("accessToken");

                        JSONObject patientInfo = auth.optJSONObject("patient");
                        if (patientInfo == null) {
                            System.err.println("Patient information is missing...");
                        }
                        String abhaAddress = patientInfo != null ? patientInfo.optString("id") : null;
                        String name = patientInfo != null ? patientInfo.optString("name") : null;
                        String gender = patientInfo != null ? patientInfo.optString("gender") : null;
                        int yearOfBirth = patientInfo != null ? patientInfo.optInt("yearOfBirth") : 0;
                        int monthOfBirth = patientInfo != null ? patientInfo.optInt("monthOfBirth") : 0;
                        int dayOfBirth = patientInfo != null ? patientInfo.optInt("dayOfBirth") : 0;

                        JSONArray identifiers = patientInfo != null ? patientInfo.optJSONArray("identifiers") : null;
                        if (identifiers == null) {
                            System.err.println("Patient Identifier information is missing...");
                        }
                        String mobileNumber = null;
                        String abhaNumber = null;
                        for (int i = 0; i < (identifiers != null ? identifiers.length() : 0); i++) {
                            JSONObject identifier = identifiers.getJSONObject(i);
                            if ("MOBILE".equals(identifier.getString("type"))) {
                                mobileNumber = identifier.getString("value");
                            } else if ("NDHM_HEALTH_NUMBER".equals(identifier.getString("type"))) {
                                abhaNumber = identifier.getString("value");
                            }
                        }
                        if (mobileNumber == null || abhaNumber == null) {
                            System.err.println("Patient mobile number or abha number is missing...");
                        }

                        if (yearOfBirth == 0 || monthOfBirth == 0 || dayOfBirth == 0) {
                            System.err.println("Date of birth components are missing...");
                        }
                        LocalDate dateOfBirth = LocalDate.of(yearOfBirth, monthOfBirth, dayOfBirth);
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                        String dob = dateOfBirth.format(formatter);

//                        JSONObject patientData = new JSONObject();
//                        patientData.put("accessToken", accessToken);
//                        patientData.put("abhaNumber", abhaNumber);
//                        patientData.put("abhaAddress", abhaAddress);
//                        patientData.put("name", name);
//                        patientData.put("gender", gender);
//                        patientData.put("dateOfBirth", dob);
//                        patientData.put("mobileNumber", mobileNumber);


                        // Assuming Patient is a model managed by patientService
                        Patient patient = new Patient();
                        patient.setName(name);
                        patient.setAbhaId(abhaAddress);
                        patient.setMobileNo(mobileNumber);
                        patient.setDob(dateOfBirth);
                        patient.setGender(gender);
                        patient.setAccessToken(accessToken);
                        System.out.println("From on-confirm: " + patient);
                        patientService.addPatient(patient);
                    }
                }
            } catch (JSONException je) {
                System.err.println("Failed to process patient data: " + je.getMessage());
            }
    }

//    @GetMapping("/getPatientInfo")
//    public ResponseEntity<?> getPatientInfo() {
//        System.out.println("From getPatientInfo" + patientData);
//        return ResponseEntity.ok().body(patientData);
//    }
}