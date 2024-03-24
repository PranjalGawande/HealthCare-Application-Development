package com.example.HAD.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExtraDTO {
    //To Specify doctor and receptionist
    String email;

    //To change Password
    String oldPassword;
    String newPassword;
}
