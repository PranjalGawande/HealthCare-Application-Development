package com.example.HAD.Backend;


import com.example.HAD.Backend.entities.Admin;
import com.example.HAD.Backend.entities.Login;
import com.example.HAD.Backend.entities.Role;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.AdminService;
import com.example.HAD.Backend.service.LoginService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;


import java.util.Calendar;


@SpringBootApplication
public class 	HadBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HadBackendApplication.class, args);
	}

	@Component
	class AdminInitializer implements CommandLineRunner {

		@Autowired
		private LoginService loginService;

		@Autowired
		private AdminService adminService;

		@Transactional
		public void run(String... args) throws Exception {

			if(!adminService.getAdminList().isEmpty()) return;

			Login staff = new Login();
			staff.setEmail("hari@gmail.com");
			staff.setPassword("Hari");
			staff.setRole(Role.ADMIN);
			staff.setStatus(true);

			loginService.addLogin(staff);

			StaffDTO staffDetail = new StaffDTO();
			Calendar dob = Calendar.getInstance();
			dob.set(1992, 8, 15);
			staffDetail.setDob(dob);
			staffDetail.setGender("Male");
			staffDetail.setRole(Role.ADMIN);
			staffDetail.setName("Hari Prasad");
			staffDetail.setMobileNo("9108888993");
			staffDetail.setEmail("hari@gmail.com");

			Admin admin = new Admin(staffDetail);
			admin.setLogin(staff);

			adminService.addAdmin(admin);
		}
	}
}
