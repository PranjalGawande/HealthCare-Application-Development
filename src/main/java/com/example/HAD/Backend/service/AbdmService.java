package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.Doctor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.net.http.HttpRequest;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AbdmService {

    @Value("${hiu.id}")
    private String hiuId;

    @Value("${hiu.name}")
    private String hiuName;

    @Autowired
    private AbdmSessionService abdmSessionService;

    @Autowired
    private DoctorService doctorService;

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

    public String getEncryptionKeys() {
        System.out.println("GETTING-ENCRYPTION-KEYS");
        String requestBody =  "";
        java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8090/keys/generate"))
                .method("GET", java.net.http.HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .build();
        HttpResponse<String> response = null;
        HttpClient client = HttpClient.newHttpClient();
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("RESPONSE : "+ response.body());
            return response.body();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "";
        }
    }

    public String getEncryptedData(String bundleString, String publicKey, String nonce, String hipPublicKey, String hipPrivateKey, String hipNonce) throws JSONException {
        System.out.println("GET-ENCRYPTED DATA: ");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("receiverPublicKey", publicKey);
        jsonObject.put("receiverNonce", nonce);
        jsonObject.put("senderPrivateKey", hipPrivateKey);
        jsonObject.put("senderPublicKey", hipPublicKey);
        jsonObject.put("senderNonce", hipNonce);
        jsonObject.put("plainTextData", bundleString);

        String requestBody =  jsonObject.toString();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8090/encrypt"))
                .method("POST",HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .build();
        HttpResponse<String> response = null;
        HttpClient client = HttpClient.newHttpClient();
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("RESPONSE ENCRYPTED: "+ response.body().length());
            return response.body();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "";
        }

    }

    public void sendEncryptedData(String dataPushUrl, String encryptedResponse, String nonce, List<Integer> careContextReference) throws Exception {
        System.out.println("SEND-ENCRYPTED DATA: ");

        JSONObject encryptedObject = new JSONObject(encryptedResponse);

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("pageNumber", 0);
        jsonObject.put("pageCount", 0);
        jsonObject.put("transactionId", UUID.randomUUID().toString());

        JSONArray entries = new JSONArray();

        JSONObject entryJson = new JSONObject();
        entryJson.put("content", encryptedObject.get("encryptedData"));
        entryJson.put("media","application/fhir+json");
        entryJson.put("checksum", "string");
        entryJson.put("careContextReference",careContextReference.get(0));

        entries.put(entryJson);

        JSONObject keyMaterial = new JSONObject();
        keyMaterial.put("cryptoAlg","ECDH");
        keyMaterial.put("curve","Curve25519");

        JSONObject dhPublicKey = new JSONObject();
        dhPublicKey.put("expiry", LocalDateTime.now().plusDays(1).format(DateTimeFormatter.ISO_DATE_TIME));
        dhPublicKey.put("parameters", "Curve25519/32byte random key");
        dhPublicKey.put("keyValue", encryptedObject.get("keyToShare"));

        keyMaterial.put("dhPublicKey", dhPublicKey);
        keyMaterial.put("nonce", nonce);

        jsonObject.put("entries", entries);
        jsonObject.put("keyMaterial", keyMaterial);

        String authToken = abdmSessionService.getToken();

        String requestBody = jsonObject.toString();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(dataPushUrl))
                .method("POST",HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + authToken)
                .build();

        HttpResponse<String> response = null;
        HttpClient client = HttpClient.newHttpClient();
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("RESPONSE ENCRYPTED LENGTH: "+ response.body().length());

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void sendHipOnRequest(String requestId, String transactionId) throws Exception {

        System.out.println("SEND-ACKNOWLEDGEMENT FOR HIP REQUEST: ");
        try {
            JSONObject response = new JSONObject();
            response.put("requestId", UUID.randomUUID().toString());
            response.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

            JSONObject hiRequest = new JSONObject();
            hiRequest.put("transactionId", transactionId);
            hiRequest.put("sessionStatus", "ACKNOWLEDGED");

            JSONObject resp = new JSONObject();
            resp.put("requestId", requestId);

            response.put("hiRequest", hiRequest);
            response.put("resp", resp);

            String authToken = abdmSessionService.getToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(authToken);
            headers.set("X-CM-ID", "sbx");

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> entity = new HttpEntity<>(response.toString(), headers);
            ResponseEntity<String> acknowledgment = restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/health-information/hip/on-request", HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    public void sendTransferStatus(String transactionId, String consentId, Integer careContextReference) {
        System.out.println("SEND-ACKNOWLEDGEMENT FOR HIP REQUEST: ");
        try {
            JSONObject notification = new JSONObject();

            notification.put("careContextReference", careContextReference);
            notification.put("hiStatus", "OK");
            notification.put("description", "string");

            JSONObject statusNotification = new JSONObject();
            statusNotification.put("sessionStatus", "TRANSFERRED");

            // Value is hard coded for Now.
            statusNotification.put("hipId", "919");
            statusNotification.put("statusResponses", new JSONObject[]{notification});

            JSONObject notifier = new JSONObject();
            notifier.put("type", "HIP");
            // Value is hard coded for Now.
            notifier.put("id", "919");

            JSONObject json = new JSONObject();
            json.put("requestId", UUID.randomUUID().toString());
            json.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            json.put("notification", notification);
            json.put("consentId", consentId);
            json.put("transactionId", transactionId);
            json.put("doneAt", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            json.put("notifier", notifier);
            json.put("statusNotification", statusNotification);

            String authToken = abdmSessionService.getToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(authToken);
            headers.set("X-CM-ID", "sbx");

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> entity = new HttpEntity<>(json.toString(), headers);
            ResponseEntity<String> acknowledgment = restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/health-information/notify", HttpMethod.POST, entity, String.class);
            System.out.println(acknowledgment);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private JSONObject prepareConsentRequest(JSONObject requestData) throws JSONException {
        String requestId = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();
        JSONObject requestDataForABDM = new JSONObject();
        requestDataForABDM.put("requestId", requestId);
        requestDataForABDM.put("timestamp", timestamp);

        JSONObject purpose = requestData.getJSONObject("purpose");
        JSONObject consent = new JSONObject();
        consent.put("purpose", purpose);

        String patientAbhaAddress = requestData.getString("patientAbhaAddress");
        JSONObject patient = new JSONObject();
        patient.put("id", patientAbhaAddress);
        consent.put("patient", patient);

        JSONObject hiu = new JSONObject();
        hiu.put("id", hiuId);
        hiu.put("name", hiuName);
        consent.put("hiu", hiu);

        String hipId = requestData.getString("hipId");
        JSONObject hip = new JSONObject();
        hip.put("id", hipId);
        consent.put("hip", hip);

        JSONObject requester = new JSONObject();
        String doctorEmail = requestData.getString("doctorEmail");
        Doctor doctor = doctorService.getDoctorDetailsByEmail(doctorEmail);
        requester.put("name", doctor.getName());
        JSONObject identifier = new JSONObject();
        identifier.put("type", "REGNO");
        identifier.put("value", doctor.getDoctorLicenseNo());
        identifier.put("system", "https://www.mciindia.org");
        requester.put("identifier", identifier);
        consent.put("requester", requester);

        consent.put("hiTypes", requestData.getJSONArray("hiTypes"));
        consent.put("permission", requestData.getJSONObject("permission"));

        requestDataForABDM.put("consent", consent);

        return requestDataForABDM;
    }
    public boolean sendConsentRequest(JSONObject requestData, String bearerToken) throws JSONException {
        System.out.println("AbdmService: " + requestData.toString());
        JSONObject requestBody = prepareConsentRequest(requestData);
        String url = "https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
        headers.set("X-CM-ID", "sbx"); // Set custom header
        headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

        HttpEntity<?> entity = new HttpEntity<>(requestBody.toString(), headers);
        // Perform the POST request and capture the response
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            return response.getStatusCode() == HttpStatus.ACCEPTED;
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return false;
    }
    public String checkConsentRequestStatus(String consentRequestId, String bearerToken) throws JSONException {
        System.out.println("consentRequestId as received in <AbdmService.checkConsentRequestStatus>: " + consentRequestId);
        String url = "https://dev.abdm.gov.in/gateway/v0.5/consent-requests/status";
        JSONObject requestBody = new JSONObject();
        requestBody.put("requestId", UUID.randomUUID().toString());
        requestBody.put("timestamp", Instant.now().toString());
        requestBody.put("consentRequestId", consentRequestId);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
        headers.set("X-CM-ID", "sbx"); // Set custom header
        headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

        HttpEntity<?> entity = new HttpEntity<>(requestBody.toString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            return String.valueOf(response.getStatusCode() == HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.err.println("Some issue occurred while sending request to ABDM server from <AbdmService.checkConsentRequestStatus>: " + e.getMessage());
            return "Some issue occurred while sending request to ABDM server";
        }
    }

    public String consentsHiuOnNotify(String requestId, String consentRequestId, String bearerToken) throws JSONException {
        String url = "https://dev.abdm.gov.in/gateway/v0.5/consents/hiu/on-notify";
        JSONObject requestBody = new JSONObject();
        requestBody.put("requestId", UUID.randomUUID().toString());
        requestBody.put("timestamp", Instant.now().toString());

        JSONArray acknowledgementArray = new JSONArray();
        JSONObject acknowledgementObject = new JSONObject();
        acknowledgementObject.put("status", "OK");
        acknowledgementObject.put("consentId", consentRequestId);
        acknowledgementArray.put(acknowledgementObject);
        requestBody.put("acknowledgement", acknowledgementArray);

        JSONObject respObject = new JSONObject();
        respObject.put("requestId", requestId);
        requestBody.put("resp", respObject);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
        headers.set("X-CM-ID", "sbx"); // Set custom header
        headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

        HttpEntity<?> entity = new HttpEntity<>(requestBody.toString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            return String.valueOf(response.getStatusCode() == HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.err.println("Some issue occurred while sending request to ABDM server from <AbdmService.consentsHiuOnNotify>: " + e.getMessage());
            return "Some issue occurred while sending request to ABDM server";
        }
    }

    public String getArtefacts(String consentRequestArtefactId, String bearerToken) throws JSONException {
        String url = "https://dev.abdm.gov.in/gateway/v0.5/consents/fetch";
        JSONObject requestBody = new JSONObject();
        requestBody.put("requestId", UUID.randomUUID().toString());
        requestBody.put("timestamp", Instant.now().toString());
        requestBody.put("consentId", consentRequestArtefactId);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.ALL)); // Set Accept header to */*
        headers.set("X-CM-ID", "sbx"); // Set custom header
        headers.setBearerAuth(bearerToken); // Include the Bearer token in the Authorization header

        HttpEntity<?> entity = new HttpEntity<>(requestBody.toString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            return String.valueOf(response.getStatusCode() == HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.err.println("Some issue occurred while sending request to ABDM server from <AbdmService.consentsHiuOnNotify>: " + e.getMessage());
            return "Some issue occurred while sending request to ABDM server";
        }
    }
}