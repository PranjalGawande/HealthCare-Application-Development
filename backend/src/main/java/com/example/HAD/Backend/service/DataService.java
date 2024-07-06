package com.example.HAD.Backend.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class DataService {
    private Map<String, String> dataStore = new ConcurrentHashMap<>();

    public void putData(String key, String value) {
        dataStore.put(key, value);
    }

    public String getData(String key) {
        return dataStore.get(key);
    }
}
