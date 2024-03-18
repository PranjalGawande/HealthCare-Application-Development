package com.example.HAD.Backend;

import com.example.HAD.Backend.bean.Admin;
import com.example.HAD.Backend.bean.Login;
import com.example.HAD.Backend.controller.AdminController;
import com.example.HAD.Backend.controller.ReceptionistController;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;

@SpringBootApplication
public class HadBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HadBackendApplication.class, args);
	}

//	@Component
//	class AdminInitializer implements CommandLineRunner {
//		private final LoginService loginService;
//		private final AdminController adminController;
//		private final ReceptionistController receptionistController;
//
//		@Autowired
//		public AdminInitializer(LoginService loginService, AdminController adminController, ReceptionistController receptionistController) {
//			this.loginService = loginService;
//			this.adminController = adminController;
//			this.receptionistController = receptionistController;
//		}
//
//		@Override
//		public void run(String... args) throws Exception {
//
//			Login admin = new Login();
//			admin.setEmail("hari@gmail.com");
//			admin.setPassword("Hari");
//			admin.setRole("admin");
//			admin.setStatus(true);
//
//			loginService.addLogin(admin);
//
//			StaffDTO staffDetail = new StaffDTO();
//			staffDetail.setAbhaId(null);
//			staffDetail.setDob(new Date(1992, 8, 15)); // Setting the date of birth using LocalDate
//			staffDetail.setGender("Male");
//			staffDetail.setRole("admin");
//			staffDetail.setName("Hari Prasad");
//			staffDetail.setMobileNo("9108888993");
//			staffDetail.setEmail("hari@gmail.com");
//
//			adminController.addStaffdetails(staffDetail);
//		}
//	}
}
