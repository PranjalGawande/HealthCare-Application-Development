package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class StaffListDTO {
    private String name;
    private String email;
    private Role role;
    private boolean status;
}
