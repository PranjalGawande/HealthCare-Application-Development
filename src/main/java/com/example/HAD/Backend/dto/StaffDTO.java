package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.Admin;
import com.example.HAD.Backend.entities.Receptionist;
import com.example.HAD.Backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StaffDTO {
    private Integer staffId;
    private String name;
    private Calendar dob;
    private String mobileNo;
    private String gender;
    private String abhaId;
    private Role role;
    private String email;
    private String token;

    public StaffDTO(Admin staff, String token) {
        this.staffId = staff.getAdminId();
        this.dob = staff.getDob();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.abhaId = staff.getAbhaId();
        this.role = staff.getRole();
        this.email = staff.getLogin().getEmail();
        this.token = token;
    }

    public StaffDTO(Receptionist staff, String token) {
        this.staffId = staff.getReceptionistId();
        this.dob = staff.getDob();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.abhaId = staff.getAbhaId();
        this.role = staff.getRole();
        this.email = staff.getLogin().getEmail();
        this.token = token;
    }
}