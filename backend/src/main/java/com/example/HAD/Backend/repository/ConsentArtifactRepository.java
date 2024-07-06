package com.example.HAD.Backend.repository;

import com.example.HAD.Backend.entities.ConsentArtifact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentArtifactRepository extends JpaRepository<ConsentArtifact, String> {
    @Query("SELECT ca FROM ConsentArtifact ca WHERE ca.consentId=:consentId")
    ConsentArtifact findConsentById(@Param("consentId") String consentId);
}
