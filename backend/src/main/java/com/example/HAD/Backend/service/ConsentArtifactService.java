package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.ConsentArtifact;
import com.example.HAD.Backend.repository.ConsentArtifactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsentArtifactService {

    @Autowired
    private ConsentArtifactRepository consentArtifactRepository;

    public void addConsentArtifact(ConsentArtifact consentArtifact) {
        consentArtifactRepository.save(consentArtifact);
    }

    public ConsentArtifact findConsentId(String consentId) {
        return consentArtifactRepository.findConsentById(consentId);
    }
}
