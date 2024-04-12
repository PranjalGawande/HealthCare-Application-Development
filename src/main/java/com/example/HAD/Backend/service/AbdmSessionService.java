package com.example.HAD.Backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.crypto.Cipher;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Service
public class AbdmSessionService {

    @Value("${gateway.clientId}")
    private String clientId;

    @Value("${gateway.clientSecret}")
    private String clientSecret;

    @Value("${publickey.v2}")
    private String publicKeyUrl;

    @Value("${publickey.v1.phr}")
    private String publicKeyUrlPhr;

    public String getToken() throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        JSONObject requestJson = new JSONObject();
        requestJson.put("clientId", clientId);
        requestJson.put("clientSecret", clientSecret);
        requestJson.put("grantType", "client_credentials");

        HttpEntity<String> requestEntity = new HttpEntity<>(requestJson.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://dev.abdm.gov.in/gateway/v0.5/sessions",
                HttpMethod.POST,
                requestEntity,
                String.class);

        JSONObject responseJson = new JSONObject(responseEntity.getBody());
        return responseJson.getString("accessToken");
    }

    public String fetchPublicKeyV2() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(publicKeyUrl))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String fetchedPublicKeyStr = response.body()
                .replaceAll("-----BEGIN PUBLIC KEY-----", "")
                .replaceAll("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s+", "");

        return fetchedPublicKeyStr;
    }

    public String fetchPublicKeyV1Phr() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(publicKeyUrlPhr))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String fetchedPublicKeyStr = response.body()
                .replaceAll("-----BEGIN PUBLIC KEY-----", "")
                .replaceAll("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s+", "");

        return fetchedPublicKeyStr;
    }

    public String encryptTextUsingPublicKey(String text, String publicKeyStr, String transformType) throws Exception {
        byte[] publicBytes = Base64.getDecoder().decode(publicKeyStr);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);

        Cipher cipher = Cipher.getInstance(transformType);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);

        byte[] encryptedBytes = cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
}
