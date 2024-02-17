package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.bean.Staff;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StaffDTO {
    private Integer staffId;
    private String name;
    private String mobileNo;
    private String gender;
    private String abhaId;

    public StaffDTO(Staff staff) {
        this.staffId = staff.getStaffId();
        this.name = staff.getName();
        this.mobileNo = staff.getMobileNo();
        this.gender = staff.getGender();
        this.abhaId = staff.getAbhaId();
    }
}
