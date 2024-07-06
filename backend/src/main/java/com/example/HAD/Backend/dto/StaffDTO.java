package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.Admin;
import com.example.HAD.Backend.entities.Receptionist;
import com.example.HAD.Backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StaffDTO {
    private Integer staffId;
    private String name;
    private LocalDate dob;
    private String mobileNo;
    private String gender;
    private Role role;
    private boolean status;
    private String email;

    public StaffDTO(Admin staff) {
        this.staffId = staff.getAdminId();
        this.dob = staff.getDob();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.role = staff.getRole();
        this.status = staff.getLogin().getStatus();
        this.email = staff.getLogin().getEmail();
    }

    public StaffDTO(Receptionist staff) {
        this.staffId = staff.getReceptionistId();
        this.dob = staff.getDob();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.role = staff.getRole();
        this.status = staff.getLogin().getStatus();
        this.email = staff.getLogin().getEmail();
    }
}