package com.example.HAD.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;

import static com.example.HAD.Backend.entities.Permission.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum Role {
    ADMIN(
            Set.of(
                    ADMIN_GET,
                    ADMIN_POST,
                    DOCTOR_GET,
                    DOCTOR_POST,
                    RECEPTIONIST_GET,
                    RECEPTIONIST_POST
            )
    ),
    DOCTOR(
            Set.of(
                    DOCTOR_GET,
                    DOCTOR_POST
            )
    ),
    Receptionist(
            Set.of(
                    RECEPTIONIST_GET,
                    RECEPTIONIST_POST
            )
    )
    ;

    private Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getUserAuthorties() {
        var authorities = new java.util.ArrayList<>(getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
