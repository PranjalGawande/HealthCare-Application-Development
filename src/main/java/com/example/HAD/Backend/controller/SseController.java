package com.example.HAD.Backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@CrossOrigin("http://localhost:9191")
public class SseController {

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @GetMapping("/events")
    public SseEmitter handleClient() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // Timeout, Long.MAX_VALUE for no timeout
        this.emitters.add(emitter);

        emitter.onCompletion(() -> this.emitters.remove(emitter));
        emitter.onTimeout(() -> this.emitters.remove(emitter));
        emitter.onError((e) -> this.emitters.remove(emitter));

        return emitter;
    }

    public void sendToClients(String type, Object data) {
        System.out.println("transactionId: " + (String) data);
        List<SseEmitter> deadEmitters = new ArrayList<>();
        this.emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event().name(type).data(data));
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        this.emitters.removeAll(deadEmitters);
    }
}

