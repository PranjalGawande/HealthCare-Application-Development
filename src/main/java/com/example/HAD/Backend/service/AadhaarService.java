package com.example.HAD.Backend.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class AadhaarService {

    // Validation logic
    public boolean isValidAadhaarNumber(String aadhaarNumber) {
        if (aadhaarNumber.length() != 12) {
            return false;
        }
        if (aadhaarNumber.matches("[^0-9]+")) {
            return false;
        }
        var aadhaarArray = aadhaarNumber.split("");
        var toCheckChecksum = aadhaarArray[aadhaarArray.length - 1];
        var calculatedChecksum = generateChecksum(Arrays.copyOf(aadhaarArray, aadhaarArray.length - 1));
        return calculatedChecksum.equals(toCheckChecksum);
    }

    private String generateChecksum(String[] digits) {
        int[][] d = {
                {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, {1, 2, 3, 4, 0, 6, 7, 8, 9, 5}, {2, 3, 4, 0, 1, 7, 8, 9, 5, 6},
                {3, 4, 0, 1, 2, 8, 9, 5, 6, 7}, {4, 0, 1, 2, 3, 9, 5, 6, 7, 8}, {5, 9, 8, 7, 6, 0, 4, 3, 2, 1},
                {6, 5, 9, 8, 7, 1, 0, 4, 3, 2}, {7, 6, 5, 9, 8, 2, 1, 0, 4, 3}, {8, 7, 6, 5, 9, 3, 2, 1, 0, 4},
                {9, 8, 7, 6, 5, 4, 3, 2, 1, 0}
        };
        int[][] p = {
                {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, {1, 5, 7, 6, 2, 8, 3, 0, 9, 4}, {5, 8, 0, 3, 7, 9, 6, 1, 4, 2},
                {8, 9, 1, 6, 0, 4, 3, 5, 2, 7}, {9, 4, 5, 3, 1, 2, 6, 8, 7, 0}, {4, 2, 8, 6, 5, 7, 3, 9, 0, 1},
                {2, 7, 9, 3, 8, 0, 6, 4, 1, 5}, {7, 0, 4, 6, 9, 1, 3, 2, 5, 8}
        };
        int[] inv = {0, 4, 3, 2, 1, 5, 6, 7, 8, 9};
        int c = 0;
        for (int i = digits.length - 1; i >= 0; i--) {
            c = d[c][p[(digits.length - i) % 8][Integer.parseInt(digits[i])]];
        }
        return Integer.toString(inv[c]);
    }

    // OTP Requester logic
    public Map<String, Object> sendEncryptedAadhaar(String encryptedAadhaar, String token) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("aadhaar", encryptedAadhaar);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        return response.getBody();
    }

    // OTP Verifier logic
    public Map<String, Object> verifyOtp(String encryptedAadhaarOtp, String txnID, String bearerToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("otp", encryptedAadhaarOtp);
            requestBody.put("txnId", txnID);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(bearerToken);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

            String url = "https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/verifyOTP";

            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
