package com.example.HAD.Backend.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
public class AbdmAbhaAddressCreationService {
    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> searchAuthMethods(String healthIdNumber, String bearerToken) {
        return performPostRequest(
                "https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/search/auth-methods",
                Map.of("healhtIdNumber", healthIdNumber),
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

    public Map<String, Object> resendOTP(String transactionId, String bearerToken) {
        return performPostRequest(
                "https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/init/resendOtp",
                Map.of("transactionId", transactionId),
                bearerToken
        );
    }

    public Map<String, Object> confirmCredential(String encryptedOtp, String lastTxnId, String bearerToken) {
        return performPostRequest(
                "https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/confirm/credential",
                Map.of("transactionId", lastTxnId, "value", encryptedOtp), // Adjust "lastResponseTxnId" as needed
                bearerToken
        );
    }

    public List<String> suggestPhrAddresses(String lastTxnId, String bearerToken) {

        String url = "https://phrsbx.abdm.gov.in/api/v1/phr/registration/phr/suggestion";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(bearerToken); // Set the bearer token

        // Create the request body
        Map<String, String> requestBody = Map.of("transactionId", lastTxnId);

        // Create an HttpEntity object with the requestBody
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        // Make the POST request and specify the response type as List.class since we expect a JSON array
        ResponseEntity<List> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                List.class
        );

        // Check the response status and body
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            // Assuming the body is a List of Strings as shown in the provided response image
            return response.getBody();
        } else {
            // Return an empty list if the transaction is unsuccessful or no suggestions found
            return Collections.emptyList();
        }
    }

    // should be done on front end
    public Boolean checkAbhaAddressValidity(String abhaAddress, String bearerToken) {

        // Check if the address is null or too short
        if (abhaAddress == null || abhaAddress.length() < 4) {
            return false;
        }

        // Check if it starts with a digit or has incorrect starting or ending characters
        if (Character.isDigit(abhaAddress.charAt(0)) ||
                abhaAddress.startsWith(".") || abhaAddress.endsWith(".") ||
                abhaAddress.startsWith("_") || abhaAddress.endsWith("_")) {
            return false;
        }

        // Check for numeric only address or invalid characters
        if (abhaAddress.matches("\\d+") || !abhaAddress.matches("[a-zA-Z0-9._]+")) {
            return false;
        }

        // Check if the given ABHA address is already taken
        if (doesAbhaAddressExists(abhaAddress, bearerToken)) {
            return false;
        }

        return true;
    }

    public Boolean doesAbhaAddressExists(String abhaAddress, String bearerToken) {
        try {
            URI uri = UriComponentsBuilder.fromHttpUrl("https://phrsbx.abdm.gov.in/api/v1/phr/search/isExist")
                    .queryParam("phrAddress", abhaAddress)
                    .build()
                    .toUri();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header
            headers.setAccept(List.of(MediaType.APPLICATION_JSON)); // Expect JSON response

            // Create an HttpEntity object without body, only headers
            HttpEntity<?> entity = new HttpEntity<>(headers);

            // Make the GET request and specify the response type
            ResponseEntity<Boolean> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    entity,
                    Boolean.class
            );

            // Evaluate the response
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Map<String, Object> createAbhaAddress(String password, String abhaAddress, String transactionId, String bearerToken) {
        // Convert password to Base64 if not empty
        String encodedPassword = password.isEmpty() ? "" : Base64.getEncoder().encodeToString(password.getBytes());
        Map<String, Object> requestBody = Map.of(
                "password", encodedPassword,
                "phrAddress", abhaAddress,
                "transactionId", transactionId
        );

        return performPostRequest(
                "https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/create-phr-address",
                requestBody,
                bearerToken
        );
    }

    private <T> Map<String, Object> performPostRequest(String url, Map<String, T> requestBody,  String bearerToken) {
        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header
            headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
            headers.set("Referer", "https://phr.abdm.gov.in/register/health-id");

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
}
