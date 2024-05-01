package com.example.HAD.Backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "access_logs")
public class AccessLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "access_id")
    private Integer accessId;

    @Column
    private String email;

    @Column
    private String roleType;

    @Column
    private Integer userId;

    @Column
    private String modifiedEntityType;

    @Column
    private Integer accessedRecordId;

    @Column
    private String accessedEmailId;

    @Column
    private String action;

    @Column
    private LocalDate date;

    @Column
    private LocalTime timeStamp;
}
