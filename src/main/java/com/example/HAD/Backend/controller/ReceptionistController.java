package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.ExtraDTO;
import com.example.HAD.Backend.dto.PatientDto;
import com.example.HAD.Backend.dto.StaffDTO;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.dto.DoctorListDTO;
import com.example.HAD.Backend.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.LocalDate;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/receptionist")
@PreAuthorize("hasAnyRole('Receptionist', 'Admin')")
public class ReceptionistController {

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private AadhaarService aadhaarService;

    @Autowired
    private AbdmSessionService abdmSessionService;

    @Autowired
    private AbdmService abdmService;

    @Autowired
    private AbdmAbhaAddressCreationService abdmAbhaAddressCreationService;

    @Autowired
    private DataService dataService;

    @PostMapping("/receptionistDetails")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<StaffDTO> getReceptionistDetail(
            @RequestBody ExtraDTO extraDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Receptionist receptionist;
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            receptionist = receptionistService.getReceptionistDetails(extraDTO.getEmail());
        } else {
            receptionist = receptionistService.getReceptionistDetails(userDetails.getUsername());
        }

        StaffDTO staffDTO = new StaffDTO(receptionist);
        return ResponseEntity.ok().body(staffDTO);
    }

    @PostMapping("/addPatient")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> addPatientDetails(@RequestBody Map<String, String> patientData) {
        Patient patient = new Patient();
        patient.setAbhaId(patientData.get("abhaAddress"));
        patient.setBloodGroup(patientData.get("bloodGroup"));
        patient.setAddress(patientData.get("address"));
        patientService.addPatient(patient);
        return ResponseEntity.ok().body("Successfully added New Patient Record");
    }


// ---------------------------------------------------

    @PostMapping("/generateAadhaarOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> generateAadhaarOtp(@RequestBody Map<String, String> aadhaarData, HttpSession session, HttpServletRequest request) {
        if(aadhaarData == null || !aadhaarService.isValidAadhaarNumber(aadhaarData.get("aadhaarNumber"))) {
            return ResponseEntity.badRequest().body("Invalid or missing Aadhaar Number.");
        }

        try {
            String aadhaarNumber = aadhaarData.get("aadhaarNumber");
            // Generate a gateway session token using the unified AbdmSessionService
            String token = abdmSessionService.getToken();

            // Encrypt the Aadhaar number using the unified AbdmSessionService
            String publicKeyStr = abdmSessionService.fetchPublicKeyV2();
            String encryptedAadhaar = abdmSessionService.encryptTextUsingPublicKey(aadhaarNumber, publicKeyStr, "RSA/ECB/PKCS1Padding");

            // Send encrypted Aadhaar and request OTP
            Map<String, Object> result = aadhaarService.sendEncryptedAadhaar(encryptedAadhaar, token); // Use aadhaarService here
            if (result == null || !result.containsKey("txnId")) {
                return ResponseEntity.internalServerError().body("Failed to send Aadhaar OTP.");
            }
            String txnID = (String) result.get("txnId");

            // Store txnID and token in session for later retrieval
            session.setAttribute("txnId", txnID);
            session.setAttribute("token", token);
            session.setAttribute("publicKeyStr", publicKeyStr);

            // Print the values to the console
            System.out.println("Session object: " + session);
            System.out.println("txnId: " + session.getAttribute("txnId"));
            System.out.println("token: " + session.getAttribute("token"));
            System.out.println("publicKeyStr: " + session.getAttribute("publicKeyStr"));

            // Inform the frontend that the OTP was sent
            return ResponseEntity.ok("OTP has been sent to the registered mobile number.");
        } catch (Exception e) {
            // Log the exception and return a generic error response
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP request.");
        }
    }

    @PostMapping("/verifyAadhaarOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> verifyAadhaarOtp(@RequestBody Map<String, String> otpData, HttpSession session, HttpServletRequest request) {
        // Retrieve txnId and token from session
        String txnId = (String) request.getSession().getAttribute("txnId");
        String token = (String) request.getSession().getAttribute("token");
        String publicKeyStr = (String) request.getSession().getAttribute("publicKeyStr");

        // Print the values to the console
        System.out.println("Session object: " + request.getSession());
        System.out.println("txnId: " + txnId);
        System.out.println("token: " + token);
        System.out.println("publicKeyStr: " + publicKeyStr);

        if (txnId == null || token == null || publicKeyStr == null || otpData == null) {
            return ResponseEntity.badRequest().body("Session expired or invalid. Please regenerate OTP.");
        }

        try {
            String otp = otpData.get("otp");

            // Encrypt the OTP using the public key
            String encryptedOtp = abdmSessionService.encryptTextUsingPublicKey(otp, publicKeyStr, "RSA/ECB/PKCS1Padding");

            // Call aadhaarService to verify encrypted OTP with txnId and token
            Map<String, Object> verificationResult = aadhaarService.verifyOtp(encryptedOtp, txnId, token); // Use aadhaarService here

            if (verificationResult == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP verification failed.");
            } else {
                // Assuming txnId and mobileLinked are keys in the returned map
                String newTxnID = (String) verificationResult.get("txnId");

                session.setAttribute("txnId", newTxnID); // Update the session with the new txnId

                // Simplified response to indicate the next step
                return ResponseEntity.ok("Aadhaar is verified now move on to next step");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP verify request.");
        }
    }

    @PostMapping("/setAbdmMobileNumber")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> setAbdmMobileNumber(@RequestBody Map<String, String> mobileData, HttpSession session) {
        String txnId = (String) session.getAttribute("txnId");
        String token = (String) session.getAttribute("token");
        String mobileNo = mobileData.get("mobileNo");

        if (txnId == null || token == null) {
            return ResponseEntity.badRequest().body("Session expired or invalid. Please regenerate OTP.");
        }

        try {
            // Call service to verify encrypted OTP with txnId and token
            Map<String, Object> verificationResult = abdmService.verifyMobile(mobileNo, txnId, token);

            if (verificationResult == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mobile number verification failed.");
            } else {
                String newTxnID = (String) verificationResult.get("txnId");

                session.setAttribute("txnId", newTxnID);
                return ResponseEntity.ok().body(verificationResult);
            }
        } catch (Exception e) {
            // Log the exception with a logger (e.g., SLF4J) instead of e.printStackTrace() for production code
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the mobile number verify request.");
        }
    }

   @PostMapping("/verifyAbdmOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> verifyAbdmOtp(@RequestBody Map<String, String> otpData, HttpSession session) {
        if (otpData == null || !otpData.containsKey("otp")) {
            return ResponseEntity.badRequest().body("Invalid request. Please include 'otp'.");
        }

        try {
            String otp = otpData.get("otp");
            String txnId = (String) session.getAttribute("txnId");
            String token = (String) session.getAttribute("token");
            String publicKeyStr = (String) session.getAttribute("publicKeyStr");

            if (token == null || publicKeyStr == null) {
                return ResponseEntity.badRequest().body("Session expired or invalid. Please login again.");
            }

            // Encrypt the OTP using the public key
            String encryptedOtp = abdmSessionService.encryptTextUsingPublicKey(otp, publicKeyStr, "RSA/ECB/PKCS1Padding");

            // Call service to verify encrypted OTP with txnId and token
            Map<String, Object> verificationResult = abdmService.verifyOtp(encryptedOtp, txnId, token);

            if (verificationResult == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP verification failed.");
            } else {
                // Create a response map to only include txnId
                String newTxnId = (String) verificationResult.get("txnId");

                session.setAttribute("txnId", newTxnId); // Update the session with the new txnId

                return ResponseEntity.ok().body(verificationResult);
            }
        } catch (Exception e) {
            // Log the exception with a logger (e.g., SLF4J) instead of e.printStackTrace() for production code
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP verify request.");
        }
    }

    @PostMapping("/createHealthIdByAadhaar")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> createHealthIdByAadhaar(@RequestBody Map<String, String> consentData, HttpSession session) {
        if (consentData == null || !consentData.containsKey("consent") || !consentData.containsKey("consentVersion")) {
            return ResponseEntity.badRequest().body("Invalid request. Please include both 'consent' and 'consentVersion'.");
        }
        try {
            String consent = consentData.get("consent");
            String consentVersion = consentData.get("consentVersion");
            String txnId = (String) session.getAttribute("txnId");
            String token = (String) session.getAttribute("token");

            if (token == null || txnId == null) {
                return ResponseEntity.badRequest().body("Session expired or invalid. Please login again.");
            }

            // Call service to verify encrypted OTP with txnId and token
            Map<String, Object> response = abdmService.createHealthId(consent, consentVersion, txnId, token);

            if (response == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("AbhaID creation failed.");
            }

            String dashedAbhaNumber = (String) response.get("healthIdNumber");

            Map<String, Object> initOtpResponse = abdmService.initTransaction("MOBILE_OTP", dashedAbhaNumber, token);

            if (initOtpResponse == null || initOtpResponse.isEmpty()) {
                return ResponseEntity.internalServerError().body("Otp generation failed. Try Again after some time.");
            }

            txnId = (String) initOtpResponse.get("transactionId");
            session.setAttribute("txnId", txnId);
            session.setAttribute("token", token);
            System.out.println(txnId);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            // Log the exception with a logger (e.g., SLF4J) instead of e.printStackTrace() for production code
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP verify request.");
        }
    }

    @PostMapping("/resendOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> resendOtp(HttpSession session) {
        String txnId = (String) session.getAttribute("txnId");
        if (txnId == null || txnId.isEmpty()) {
            return ResponseEntity.badRequest().body("Transaction ID is required but was not found in session.");
        }

        String token = (String) session.getAttribute("token");
        if (token == null) {
            return ResponseEntity.badRequest().body("Session expired or invalid. Please login again.");
        }

        try {
            // Resend OTP using the transactionId and bearer token fetched from the session
            Map<String, Object> response = abdmAbhaAddressCreationService.resendOTP(txnId, token);
            if (response == null || response.isEmpty()) {
                return ResponseEntity.internalServerError().body("Failed to resend OTP.");
            }

            return ResponseEntity.ok("OTP has been resent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while resending the OTP.");
        }
    }

    @PostMapping("/confirmAbdmCredentials")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> confirmAbdmCredentials(@RequestBody Map<String, String> otpData, HttpSession session) {
        if (otpData == null || !otpData.containsKey("otp")) {
            return ResponseEntity.badRequest().body("Invalid request. Please include 'otp'.");
        }

        try {
            String otp = otpData.get("otp");
            String txnId = (String) session.getAttribute("txnId");
            String token = (String) session.getAttribute("token");
            String publicKeyPhr = abdmSessionService.fetchPublicKeyV1Phr();

            if (token == null) {
                return ResponseEntity.badRequest().body("Session expired or invalid. Please login again.");
            }
            if (publicKeyPhr == null) {
                return ResponseEntity.badRequest().body("Internal Server Error, please try again.");
            }

            // Encrypt the OTP using the public key
            String encryptedOtp = abdmSessionService.encryptTextUsingPublicKey(otp, publicKeyPhr, "RSA");

            // Call service to verify encrypted OTP with txnId and token
            Map<String, Object> response = abdmAbhaAddressCreationService.confirmCredential(encryptedOtp, txnId, token);

            if (response == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP verification failed.");
            } else {
                // Create a response map to only include txnId
                String newTxnId = (String) response.get("transactionId");
                session.setAttribute("txnId", newTxnId); // Update the session with the new txnId
                session.setAttribute("publicKeyPhr", publicKeyPhr);

                Map<String, Object> minimalResponse = new LinkedHashMap<>();

                // Extracting and formatting the date of birth using LocalDate and DateTimeFormatter
                int yearOfBirth = Integer.parseInt((String) response.get("yearOfBirth"));
                int monthOfBirth = Integer.parseInt((String)response.get("monthOfBirth"));
                int dayOfBirth = Integer.parseInt((String)response.get("dayOfBirth"));
                LocalDate dateOfBirth = LocalDate.of(yearOfBirth, monthOfBirth, dayOfBirth);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                String dob = dateOfBirth.format(formatter);
                minimalResponse.put("DOB", dob);

                // Combining first name, middle name (if not null), and last name (if not null) into a single name
                String firstName = (String) response.get("firstName");
                String middleName = (String) response.get("middleName");
                String lastName = (String) response.get("lastName");
                String fullName = firstName;
                fullName += middleName != null ? " " + middleName : "";
                fullName += lastName != null ? " " + lastName : "";
                minimalResponse.put("name", fullName);

                // Storing other details directly from the response
                minimalResponse.put("mobile", response.get("mobile"));
                minimalResponse.put("email", response.get("email"));
                minimalResponse.put("gender", response.get("gender"));
                minimalResponse.put("kycVerified", response.get("kycVerified"));
                minimalResponse.put("linkedPhrAddess", response.get("linkedPhrAddess"));
                minimalResponse.put("phrAddress", response.get("phrAddress"));

                return ResponseEntity.ok().body(minimalResponse);
            }
        } catch (Exception e) {
            // Log the exception with a logger (e.g., SLF4J) instead of e.printStackTrace() for production code
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP verify request.");
        }
    }

    @PostMapping("/suggestAbhaAddress")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> suggestAbhaAddress(HttpSession session) {
        try {
            String txnId = (String) session.getAttribute("txnId");
            String token = (String) session.getAttribute("token");
            List<String> abhaAddresses = abdmAbhaAddressCreationService.suggestPhrAddresses(txnId, token);
            if (abhaAddresses != null && !abhaAddresses.isEmpty()) {
                return ResponseEntity.ok().body(abhaAddresses);
            } else {
                return ResponseEntity.ok().body(Collections.emptyList());
            }
        } catch (Exception e) {
            // Log the exception with a logger (e.g., SLF4J) instead of e.printStackTrace() for production code
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while processing the Aadhaar OTP verify request.");
        }
    }

    @PostMapping("/createAbhaAddress")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<?> createAbhaAddress(@RequestBody Map<String, String> abhaCreateData, HttpSession session) {
        if (abhaCreateData == null || !abhaCreateData.containsKey("abhaAddress")) {
            return ResponseEntity.badRequest().body("Invalid request. Please provide a Abha Address.");
        }

        try {
            String abhaAddress = abhaCreateData.get("abhaAddress");
            String token = (String) session.getAttribute("token");
            String txnId = (String) session.getAttribute("txnId");
            if (!abdmAbhaAddressCreationService.checkAbhaAddressValidity(abhaAddress, token)) {
                return ResponseEntity.badRequest().body("Invalid Abha address. Please provide a different Abha Address.");
            }
            String password = abhaCreateData.get("password");
            Map<String, Object> response = abdmAbhaAddressCreationService.createAbhaAddress((password == null ? "" : password), abhaAddress, txnId, token);

            if (response == null) {
                return ResponseEntity.internalServerError().body("Failed to add ABHA address....");
            }

            // Note: The ResponseEntity returned here should not assume success until the final callback confirms it.
            return ResponseEntity.ok("Abha address added successfully..");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.internalServerError().body("An error occurred while adding Abha address.");
    }

    @PostMapping("/generateAbhaAddressVerificationOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> generateAbhaAddressVerificationOtp(@RequestBody Map<String, String> abhaAddressData, HttpSession session, HttpServletRequest request) {
        if(abhaAddressData == null || !abdmService.isValidABHAAddress(abhaAddressData.get("abhaAddress"))) {
            return ResponseEntity.badRequest().body("Invalid or missing Abha address.");
        }

        try {
            String abhaAddress = abhaAddressData.get("abhaAddress");
            String token = abdmSessionService.getToken();

//            boolean fetchAuthResponse = abdmService.initiateAbhaVerification(abhaAddress, token);
//            if (!fetchAuthResponse) {
//                return ResponseEntity.internalServerError().body("Failed to send OTP...");
//            }

            boolean initOtpResponse = abdmService.generateOtpForVerification(abhaAddress, token);
            if (!initOtpResponse) {
                return ResponseEntity.internalServerError().body("Failed to send OTP....");
            }


            // Note: The ResponseEntity returned here should not assume success until the final callback confirms it.
            return ResponseEntity.ok("OTP request initiated...");
        } catch (Exception e) {
            // Log the exception and return a generic error response
            return ResponseEntity.internalServerError().body("An error occurred while processing the verification OTP request.");
        }
    }


    @PostMapping("/verificationAbhaAddressOtp")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> verificationAbhaAddressOtp(@RequestBody Map<String, String> otpData) {
        if(otpData == null) {
            return ResponseEntity.badRequest().body("Invalid or missing data in request");
        }

        try {
            String otp = otpData.get("otp");
            System.out.println("Recieved otp: "+ otp);
            String txnId = otpData.get("txnId");
//            Instant now = Instant.now();
//            Instant start = now.minusSeconds(30);
//            Instant end = now.plusSeconds(30);
//            Map<String, String> transactionIds = (Map<String, String>) dataService.getData("transactionId");
//            for (String timeStamp : transactionIds.keySet()) {
//                Instant ts = Instant.parse(timeStamp);
//                if (ts.isAfter(start) && !ts.isAfter(end)) {
//                    System.err.println("transactionId: " + transactionIds.get(timeStamp));
//                }
//            }
//            System.out.println("TransactionId from DataService:" + dataService.getData("transactionId"));
            String token = abdmSessionService.getToken();
            boolean result = abdmService.initiateAbhaOtpVerification(otp, token, txnId);
            if (!result) {
                return ResponseEntity.internalServerError().body("Incorrect OTP...");
            }
            return ResponseEntity.ok("Sending you the patient data...");
        } catch (Exception e) {
            // Log the exception and return a generic error response
            e.printStackTrace();
        }
        return ResponseEntity.internalServerError().body("An error occurred while processing the verification OTP request.");
    }

// ---------------------------------------------------

//    @PostMapping("/patientDetails")
//    @PreAuthorize("hasAuthority('receptionist:get')")
//    public ResponseEntity<?> getPatientRecord(@RequestBody PatientDto patientDto) {
//        String abhaId = patientDto.getAbhaId();
//        if (abhaId == null || abhaId.trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("ABHA ID must be provided.");
//        }
//        Patient patient = patientService.getPatientByAbhaId(abhaId);
//        if (patient == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patient found with ABHA ID: " + abhaId);
//        }
//        return ResponseEntity.ok().body(new PatientDto(patient));
//    }

    @PostMapping("/patientDetails")
    @PreAuthorize("hasAuthority('receptionist:get')")
    public ResponseEntity<Patient> getPatientRecord(@RequestBody ExtraDTO extraDTO) {
        Patient patient = patientService.getPatientByAbhaId(extraDTO.getAbhaId());
        return ResponseEntity.ok().body(patient);
    }

    @PostMapping("/addAppointment")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> addAppointment(@RequestBody ExtraDTO extraDTO) {
        Appointment appointment = new Appointment();
        appointment.setDate(extraDTO.getDate());
        appointment.setTime(extraDTO.getTime());
        appointment.setReasonForVisit(extraDTO.getReasonForVisit());
        appointment.setStatus(extraDTO.getStatus());

        Doctor doctor = doctorService.findDoctorById(extraDTO.getDoctorId());
        appointment.setDoctor(doctor);

        int tokenNo = doctor.generateToken();
        if (tokenNo == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctor appointment is full for today");
        }
        appointment.setTokenNo(tokenNo);

        Patient patient = patientService.getPatientByAbhaId(extraDTO.getAbhaId());
        if(patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patient with given Patient Id");
        }
        appointment.setPatient(patient);

        appointmentService.addAppointment(appointment);
        return ResponseEntity.ok().body("Successfully created a new Appointment. Appointment No: "+ appointment.getTokenNo());
    }

    @GetMapping("/doctorList")
    @PreAuthorize("hasAnyAuthority('receptionist:get', 'admin:get')")
    public ResponseEntity<List<DoctorListDTO>> doctorList() {
        List<DoctorListDTO> doctorListDTOS = doctorService.getDoctorList();
        return ResponseEntity.ok().body(doctorListDTOS);
    }

    @PostMapping("/updateReceptionist")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> updateReceptionist(
            @RequestBody StaffDTO staffDTO,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) {
        Receptionist receptionist;

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            receptionist = receptionistService.getReceptionistDetails(staffDTO.getEmail());
        }else {
            if(token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String email = jwtService.extractEmail(token);
            receptionist = receptionistService.getReceptionistDetails(email);
        }

        receptionist.setMobileNo(staffDTO.getMobileNo());
        receptionistService.updateReceptionist(receptionist);
        return ResponseEntity.ok().body("Successfully updated Receptionist Details");
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('receptionist:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            Login login = loginService.getLoginByEmail(extraDTO.getEmail());
            if(login == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Receptionist found with given Email");
            }
            loginService.updateLogin(extraDTO.getEmail(), extraDTO.getNewPassword());
        }
        else {
            if(token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String userName = jwtService.extractEmail(token);
            if(!loginService.verifyCurrentPassword(userName, extraDTO.getOldPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
            }

            loginService.updateLogin(userName, extraDTO.getNewPassword());
        }

        return ResponseEntity.ok("Password changed Successfully");
    }

    @PostMapping("/resetAppointment")
    @PreAuthorize("hasAuthority('receptionist:get')")
    public ResponseEntity<String> resetAppointment() {
        List<DoctorListDTO> doctors = doctorService.getDoctorList();
        for (DoctorListDTO doctorListDTO : doctors) {
            doctorService.updateDoctorAppointment(doctorListDTO.getDoctorId(), 1);
        }
        return ResponseEntity.ok().body("Successfully reset the Token Number for all Doctor.");
    }
}