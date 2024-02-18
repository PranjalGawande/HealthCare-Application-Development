package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.bean.Staff;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StaffDTO {
    private Integer staffId;
    private String name;
    private Date dob;
    private String mobileNo;
    private String gender;
    private String abhaId;
    private String role;
    private String email;

    public StaffDTO(Staff staff) {
        this.staffId = staff.getStaffId();
        this.dob = staff.getDob();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.abhaId = staff.getAbhaId();
        this.role = staff.getRole();
        this.email = staff.getLogin().getEmail();
    }
}