package com.example.HAD.Backend.configuration;

import com.example.HAD.Backend.configuration.service.LoginDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.HAD.Backend.entities.Permission.*;
import static com.example.HAD.Backend.entities.Role.*;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private LoginDetailService loginDetailService;

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers("/login/**")
                                .permitAll()
                                .requestMatchers("/admin/**").hasAnyRole(ADMIN.name())
                                .requestMatchers(GET,"/admin/**").hasAuthority(ADMIN_GET.name())
                                .requestMatchers(POST,"/admin/**").hasAuthority(ADMIN_GET.name())
                                .requestMatchers("/doctor/**").hasAnyRole(DOCTOR.name())
                                .requestMatchers(GET,"/doctor").hasAuthority(DOCTOR_GET.name())
                                .requestMatchers(POST,"/doctor").hasAuthority(DOCTOR_GET.name())
                                .requestMatchers("/receptionist").hasAnyRole(Receptionist.name())
                                .requestMatchers(GET,"/receptionist").hasAuthority(RECEPTIONIST_GET.name())
                                .requestMatchers(POST,"/receptionist").hasAuthority(RECEPTIONIST_GET.name())
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(loginDetailService)
                .sessionManagement(
                        session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}