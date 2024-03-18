package com.example.HAD.Backend;


import com.example.HAD.Backend.bean.Admin;
import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.AdminService;
import com.example.HAD.Backend.service.LoginService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Date;

@SpringBootApplication
public class HadBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HadBackendApplication.class, args);
	}

	@Component
	class AdminInitializer implements CommandLineRunner {
		private final LoginService loginService;
		private final AdminService adminService;

		@Autowired
		public AdminInitializer(LoginService loginService, AdminService adminService) {
			this.loginService = loginService;
			this.adminService = adminService;
		}

		@Transactional
		public void run(String... args) throws Exception {

			Login login = loginService.getLoginByRole();

			if (login == null) {
				Login staff = new Login();
				staff.setEmail("hari@gmail.com");
				staff.setPassword("Hari");
				staff.setRole("superAdmin");
				staff.setStatus(true);

				loginService.addLogin(staff);

				StaffDTO staffDetail = new StaffDTO();
				staffDetail.setAbhaId("dfsjfvo3435");
				staffDetail.setDob(new Date(1992, 8, 15));
				staffDetail.setGender("Male");
				staffDetail.setRole("superAdmin");
				staffDetail.setName("Hari Prasad");
				staffDetail.setMobileNo("9108888993");
				staffDetail.setEmail("hari@gmail.com");

				Admin admin = new Admin(staffDetail);
				admin.setLogin(staff);

				adminService.addAdmin(admin);
			}
		}
	}
}
