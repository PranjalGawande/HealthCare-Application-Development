package com.example.HAD.Backend.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

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
}
