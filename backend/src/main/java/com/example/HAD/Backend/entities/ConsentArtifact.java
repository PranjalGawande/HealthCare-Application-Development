package com.example.HAD.Backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "consent_artifact")
public class ConsentArtifact {
    @Id
    @Column(name = "consent_id")
    private String consentId;

    private String purpose;

    private String requestId;

    private LocalDate fromDate;

    private LocalDate toDate;

    private LocalDate eraseDate;

    private LocalTime time;

    private String status;

//    @ElementCollection
//    @CollectionTable(name = "consent_hiType", joinColumns = @JoinColumn(name = "consent_id"))
//    @Column(name = "hi_type")
//    private List<String> hiType;

    @ElementCollection
    @CollectionTable(name = "consent_appointments", joinColumns = @JoinColumn(name = "consent_id"))
    @Column(name = "appointment_id")
    private List<Integer> appointmentIds;
}
