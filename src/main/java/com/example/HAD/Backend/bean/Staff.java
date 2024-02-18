package com.example.HAD.Backend.bean;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.LoginService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staffId")
    private Integer staffId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Login login;

    @Column(name = "ABHA_ID")
    private String abhaId;

    @Column(name = "role")
    private String role;

    public Staff(StaffDTO staffDTO) {
        this.name = staffDTO.getName();
        this.dob = staffDTO.getDob();
        this.gender = staffDTO.getGender();
        this.abhaId = staffDTO.getAbhaId();
        this.role = staffDTO.getRole();
        this.mobileNo = staffDTO.getMobileNo();
    }
}