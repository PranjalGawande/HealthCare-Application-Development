package com.example.HAD.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AnalyticsDTO {
        private long totalPatients;
        private long totalDoctors;
        private long totalReceptionists;
}
