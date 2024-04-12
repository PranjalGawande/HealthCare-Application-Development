package com.example.HAD.Backend.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AbdmService {
    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> verifyMobile(String mobileNo, String txnID, String bearerToken) {
        return performPostRequest(
                "https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/checkAndGenerateMobileOTP",
                Map.of("mobile", Long.parseLong(mobileNo), "txnId", txnID),
                bearerToken
        );
    }

    public Map<String, Object> verifyOtp(String encryptedAbdmOtp, String txnID, String bearerToken) {
        return performPostRequest(
                "https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/verifyMobileOTP",
                Map.of("otp", encryptedAbdmOtp, "txnId", txnID),
                bearerToken
        );
    }

    public Map<String, Object> createHealthId(String consent, String consentVersion, String txnID, String bearerToken) {
        return performPostRequest(
                "https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/createHealthIdByAdhaar",
                Map.of("consent", consent, "consentVersion", consentVersion, "txnId", txnID),
                bearerToken
        );
    }

    public Map<String, Object> initTransaction(String authMethod, String healthIdNumber, String bearerToken) {
        return performPostRequest(
                "https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/init/transaction",
                Map.of("authMethod", authMethod, "healhtIdNumber", healthIdNumber),
                bearerToken
        );
    }

    private <T> Map<String, Object> performPostRequest(String url, Map<String, T> requestBody, String bearerToken) {
        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

            // Create an HttpEntity object
            HttpEntity<Map<String, T>> entity = new HttpEntity<>(requestBody, headers);

            // Make the POST request and specify the response type
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // Evaluate the response
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Directly return the response body if successful
                return response.getBody();
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
        }
        // Return null or a specific error indicator if the transaction is unsuccessful
        return null;
    }

    public boolean isValidABHAAddress(String abhaAddress) {
        if (!abhaAddress.endsWith("@sbx")) {
            return false;
        }
        String prefix = abhaAddress.substring(0, abhaAddress.length() - 4);
        if (prefix.length() < 4
            || Character.isDigit(prefix.charAt(0))
            || prefix.startsWith(".") || prefix.endsWith(".")
            || prefix.startsWith("_") || prefix.endsWith("_")
            || prefix.matches("[0-9]+")
            || !prefix.matches("[a-zA-Z0-9._]+")) {
            return false;
        }
        return true;
    }

    public boolean generateOtpForVerification(String abhaAddress, String bearerToken) {
        // Define the endpoint URL for ABHA verification
        String url = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/init";

        // Generate a unique request ID and current timestamp
        String requestId = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();

        // Create the request body as per the given structure
        Map<String, Object> query = new HashMap<>();
        query.put("id", abhaAddress);
        query.put("purpose", "KYC_AND_LINK");
        query.put("authMode", "MOBILE_OTP");
        Map<String, String> requester = new HashMap<>();
        requester.put("type", "HIP");
        requester.put("id", "H_01");
        query.put("requester", requester);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("requestId", requestId);
        requestBody.put("timestamp", timestamp);
        requestBody.put("query", query);

        // Perform the POST request and get the response
        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
            headers.set("X-CM-ID", "sbx"); // Set custom header
            headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

            // Create an HttpEntity object with the headers and request body
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make the POST request and capture the response
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // Check if the status code is 202 Accepted
            return response.getStatusCode() == HttpStatus.ACCEPTED;

        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
        }
        // Return false if an exception occurred or if the response status is not 202
        return false;
    }

    public boolean initiateAbhaOtpVerification(String otp, String bearerToken, String transactionId) {
        // Define the endpoint URL for ABHA verification
        String url = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm";

        // Check for null to ensure that transactionId is present
        if (transactionId == null) {
            System.err.println("Transaction ID is missing from the session.");
            return false;
        }

        // Generate a unique request ID and current timestamp
        String requestId = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();

        // Create the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("requestId", requestId);
        requestBody.put("timestamp", timestamp);
        requestBody.put("transactionId", transactionId);
        Map<String, String> credential = new HashMap<>();
        credential.put("authCode", otp);
        requestBody.put("credential", credential);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
        headers.set("X-CM-ID", "sbx"); // Set custom header
        headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

        // Create an HttpEntity object with the headers and request body
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Perform the POST request and capture the response
        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // Check if the status code is 202 Accepted
            return response.getStatusCode() == HttpStatus.ACCEPTED;

        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
        }

        // Return false if an exception occurred or if the response status is not 202
        return false;
    }
}
