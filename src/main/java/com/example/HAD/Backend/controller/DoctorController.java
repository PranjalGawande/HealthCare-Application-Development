package com.example.HAD.Backend.controller;

import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.ExtraDTO;
import com.example.HAD.Backend.dto.PatientDto;
import com.example.HAD.Backend.entities.*;
import com.example.HAD.Backend.dto.MedicalRecordsDTO;
import com.example.HAD.Backend.service.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Field;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:9191")
@RequestMapping("/doctor")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private MedicalRecordsService medicalRecordsService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private AbdmSessionService abdmSessionService;

    @Autowired
    private AbdmService abdmService;

    @Autowired
    private DataService dataService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private AccessLogsService accessLogsService;

    @PostMapping("/doctorDetails")
    @PreAuthorize("hasAnyAuthority('doctor:post')")
    public ResponseEntity<DoctorDTO> getDoctorDetails(@RequestBody ExtraDTO extraDTO,
                                                      @RequestHeader("Authorization") String token,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        Doctor doctor;

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            doctor = doctorService.getDoctorDetailsByEmail(extraDTO.getEmail());

            if(token.startsWith("Bearer ")) token = token.substring(7);
            String email = jwtService.extractEmail(token);
            Admin admin = adminService.getAdminDetails(email);

            accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Doctor Record", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Read Only");
        }
        else {
            String email = userDetails.getUsername();
            doctor = doctorService.getDoctorDetailsByEmail(email);

            accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), email,"Doctor Record", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Read Only");
        }

        DoctorDTO doctorDTO = new DoctorDTO(doctor);
        return ResponseEntity.ok().body(doctorDTO);
    }

    @GetMapping("/history/{patientId}")
    @PreAuthorize("hasAuthority('doctor:get')")
    public ResponseEntity<List<MedicalRecordsDTO>> PatientConsultationHistory(
            @PathVariable("patientId") Integer patientId,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<MedicalRecords> medicalRecords;
        Patient patient = patientService.getPatientById(patientId);

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
           medicalRecords = medicalRecordsService.getPatientHistory(patientId);

            if(token.startsWith("Bearer ")) token = token.substring(7);
            String email = jwtService.extractEmail(token);
            Admin admin = adminService.getAdminDetails(email);

            accessLogsService.accessLogs("Admin", admin.getAdminId(), email,"Medical Record List", null, patient.getAbhaId(), "Read Only");
        }
        else {
            Doctor doctor = doctorService.getDoctorDetailsByEmail(userDetails.getUsername());
            // In case of doctor, treat patientId as tokenNo
            Optional<Appointment> appointmentValue = appointmentService.getAppointmentBytokenNo(doctor.getDoctorId(), patientId);
            Appointment appointment = appointmentValue.orElseThrow(()-> new RuntimeException("Unable to find the given Token Number"));

            medicalRecords = medicalRecordsService.getPatientMedicalHistory(doctor.getDoctorId(), appointment.getPatient().getPatientId());
            accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Medical Record List", null, patient.getAbhaId(), "Read Only");
        }

        List<MedicalRecordsDTO> medicalRecordsDTO = new ArrayList<>();
        for (MedicalRecords record: medicalRecords) {
            medicalRecordsDTO.add(new MedicalRecordsDTO(record));
        }

        if (medicalRecordsDTO.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok().body(medicalRecordsDTO);
        }
    }

    @PostMapping("/patientDetailByAppointmentNo")
    @PreAuthorize("hasAuthority('doctor:get')")
    public ResponseEntity<PatientDto> PatientDetails(
            @RequestBody ExtraDTO extraDTO,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);

        Doctor doctor = doctorService.getDoctorDetailsByEmail(email);

        Optional<Appointment> appointmentValue = appointmentService.getAppointmentBytokenNo(doctor.getDoctorId(), extraDTO.getTokenNo());
        Appointment appointment = appointmentValue.orElseThrow(()-> new RuntimeException("Appointment with given Id cannot be found"));

        Patient patient = patientService.getPatientById(appointment.getPatient().getPatientId());
        PatientDto patientDto = new PatientDto(patient);

        accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), email,"Appointment Record", appointment.getAppointmentId(), patient.getAbhaId(), "Read Only");
        return ResponseEntity.ok().body(patientDto);
    }

    @PostMapping("/addPatientRecord/{tokenNo}")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> addPatientConsultationRecord(
            @RequestBody MedicalRecords request,
            @PathVariable Integer tokenNo,
            @RequestHeader("Authorization") String token,
            @AuthenticationPrincipal UserDetails userDetails) throws IllegalAccessException {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin cannot add medical records");
        }

        if(token.startsWith("Bearer ")) token = token.substring(7);
        String email = jwtService.extractEmail(token);

        Doctor doctor = doctorService.getDoctorDetailsByEmail(email);

        Optional<Appointment> appointmentValue = appointmentService.getAppointmentBytokenNo(doctor.getDoctorId(), tokenNo);
        Appointment appointment = appointmentValue.orElseThrow(()-> new RuntimeException("Appointment with given Id cannot be found"));

        boolean isRequestNotNull = true;
        Field[] fields = MedicalRecords.class.getDeclaredFields();

        Set<String> variables = new HashSet<>();
        variables.add("bloodPressureLow");
        variables.add("bloodPressureHigh");
        variables.add("oxygenLevel");
        variables.add("pulse");
        variables.add("symptoms");

        for ( Field field : fields) {
            field.setAccessible(true);
            if (variables.contains(field.getName())) {
                Object value = field.get(request);
                if (value == null) {
                    isRequestNotNull = false;
                    break;
                }
            }
        }

        if (isRequestNotNull) {
            MedicalRecords medicalRecords = getMedicalRecords(request, appointment);

            appointmentService.updateAppointment(appointment.getAppointmentId(), "done");
            medicalRecordsService.addPatientConsultation(medicalRecords);

            accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), email,"Medical Record", null, medicalRecords.getAppointment().getPatient().getAbhaId(),"Insert Record");
            return ResponseEntity.ok().body("Medical Records added successfully");
        } else {
            appointmentService.updateAppointment(appointment.getAppointmentId(), "absent");

            accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), email,"Appointment Record", appointment.getAppointmentId(), appointment.getPatient().getAbhaId(),"Update Record");
            return ResponseEntity.ok().body("Patient was absent");
        }
    }

    private static MedicalRecords getMedicalRecords(MedicalRecords request, Appointment appointment) {
        MedicalRecords medicalRecords = new MedicalRecords();
        medicalRecords.setAppointment(appointment);

        List<Prescription> prescriptions = new ArrayList<>();
        for (Prescription prescriptionData : request.getPrescriptions()) {
            Prescription prescription = new Prescription();
            prescription.setMedicalRecord(medicalRecords);
            prescription.setMedicine(prescriptionData.getMedicine());
            prescription.setDosage(prescriptionData.getDosage());
            prescription.setFrequency(prescriptionData.getFrequency());
            prescription.setDuration(prescriptionData.getDuration());
            prescriptions.add(prescription);
        }
        medicalRecords.setPrescriptions(prescriptions);

        medicalRecords.setPulse(request.getPulse());
        medicalRecords.setBloodPressureLow(request.getBloodPressureLow());
        medicalRecords.setBloodPressureHigh(request.getBloodPressureHigh());
        medicalRecords.setOxygenLevel(request.getOxygenLevel());
        medicalRecords.setSymptoms(request.getSymptoms());
        medicalRecords.setDiagnosis(request.getDiagnosis());
        return medicalRecords;
    }

    @PostMapping("/updateDoctor")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> updateDoctor(
            @RequestBody DoctorDTO doctorDTO,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestHeader("Authorization") String token) {
        Doctor doctor;
        String roleType;
        Integer userId;
        String email;
        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            doctor = doctorService.getDoctorDetailsByEmail(doctorDTO.getEmail());

            if(token.startsWith("Bearer ")) token = token.substring(7);
            email = jwtService.extractEmail(token);
            Admin admin = adminService.getAdminDetails(email);
            roleType = "Admin";
            userId = admin.getAdminId();
        }
        else {
            email = userDetails.getUsername();
            doctor = doctorService.getDoctorDetailsByEmail(email);
            roleType = "Doctor";
            userId = doctor.getDoctorId();
        }

        if(doctor.getSpeciality() != null) doctor.setSpeciality(doctorDTO.getSpeciality());
        if(doctor.getExperience() != null) doctor.setExperience(doctorDTO.getExperience());
        if(doctor.getMobileNo() != null)   doctor.setMobileNo(doctorDTO.getMobileNo());
        if(doctor.getTokenMax() != null) doctor.setTokenMax(doctorDTO.getTokenMax());
        doctorService.updateDoctor(doctor);

        accessLogsService.accessLogs(roleType, userId, email,"Doctor Record", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Update Record");
        return ResponseEntity.ok().body("Successfully updated Doctor Details");
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization" )String token, @RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(isAdmin) {
            Login login = loginService.getLoginByEmail(extraDTO.getEmail());
            if(login == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Doctor found with given Email");
            }

            if(token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String email = jwtService.extractEmail(token);
            Admin admin = adminService.getAdminDetails(email);

            loginService.updateLogin(extraDTO.getEmail(), extraDTO.getNewPassword());
            accessLogsService.accessLogs("Admin", admin.getAdminId(), admin.getLogin().getEmail(),"Login Record", login.getUserId(), login.getEmail(),"Update Record(Change Password)");
        }
        else {
            String userName = userDetails.getUsername();
            if(!loginService.verifyCurrentPassword(userName, extraDTO.getOldPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
            }

            loginService.updateLogin(userName, extraDTO.getNewPassword());

            Doctor doctor = doctorService.getDoctorDetailsByEmail(userName);
            accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Login Record", doctor.getLogin().getUserId(), doctor.getLogin().getEmail(),"Update Record(Change Password)");
        }

        return ResponseEntity.ok("Password changed Successfully");
    }

    @PostMapping("/pushCareContext")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> addCareContext(@RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        Patient patient = patientService.getPatientByAbhaId(extraDTO.getAbhaId());
        String authToken = abdmSessionService.getToken();
        if (authToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String requestId = UUID.randomUUID().toString();
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        JSONObject request = new JSONObject();
        request.put("requestId", requestId);
        request.put("timestamp", timestamp);

        JSONObject link = new JSONObject();
        link.put("accessToken", patient.getAccessToken());

        JSONObject patientJson = new JSONObject();
        patientJson.put("referenceNumber", patient.getPatientId());
        patientJson.put("display", patient.getName());

        JSONArray careContexts = new JSONArray();
        List<Appointment> appointments = appointmentService.getAppointmentList(patient.getPatientId());
        if(appointments.isEmpty()) {
            return ResponseEntity.ok().body("No new CareContext found to push.");
        }

        appointmentService.updatePushCareContextStatus(patient.getPatientId());

        for (Appointment appointment : appointments) {
            JSONObject careContext = new JSONObject();
            careContext.put("referenceNumber", appointment.getAppointmentId());
            careContext.put("display", "Appointment for " + appointment.getReasonForVisit());
            careContexts.put(careContext);
        }

        patientJson.put("careContexts", careContexts);
        link.put("patient", patientJson);
        request.put("link", link);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authToken);
        headers.set("X-CM-ID", "sbx");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts", HttpMethod.POST, entity, String.class);

        Doctor doctor = doctorService.getDoctorDetailsByEmail(userDetails.getUsername());
        accessLogsService.accessLogs("Doctor", doctor.getDoctorId(), doctor.getLogin().getEmail(),"Pushing CareContext", null, null,"Read Only");

        System.out.println(response);
        return ResponseEntity.ok().body("Successfully pushed care context details to PHR App");
    }

    @PostMapping("/consentRequestInit")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> consentRequestInit(@RequestBody String requestDataStr) {
        if (requestDataStr == null) {
            return ResponseEntity.badRequest().body("Invalid request raised...");
        }

        try {
            JSONObject requestData = new JSONObject(requestDataStr);
            String token = abdmSessionService.getToken();
            System.out.println("DoctorController: " + requestData);
            boolean isRequestSent = abdmService.sendConsentRequest(requestData, token);
            if (!isRequestSent) {
                System.err.println("Failed to send request for consent to ABDM!");
                return ResponseEntity.internalServerError().body("Either duplicate consent request raised or there is invalid to-from date in request...");
            }
//            String patientAbhaAddress = requestData.getString("patientAbhaAddress");
//            dataService.putData(Instant.now().toString(), patientAbhaAddress);
//            return ResponseEntity.ok("Request for consent sent successfully");

            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                System.err.println("Some exception occurred in <DoctorController.consentRequestInit> method: " + e.getMessage());
                return ResponseEntity.internalServerError().body("Something went wrong...");
            }

            try {
                JSONObject resultJson = new JSONObject(dataService.getData("consentRequestOnInit"));
                System.out.println("Printed from <DoctorController.consentRequestInit>: " + (resultJson != null ? resultJson.toString() : "null"));
                if (resultJson == null) {
                    JSONObject errorResponse = new JSONObject();
                    errorResponse.put("error", "Webhooks.site is not receiving callbacks!!!");
                    errorResponse.put("consentRequestId", JSONObject.NULL);
                    return ResponseEntity.internalServerError().body(errorResponse.toString());
                }
                return ResponseEntity.ok(resultJson.toString());
            } catch (JSONException je) {
                System.err.println(je.getMessage());
                return ResponseEntity.internalServerError().body("{\"error\": \"Critical JSON processing error...\"}");
            }
        }  catch (Exception e) {
            System.err.println("ERROR: DoctorController>>consentRequestInit" + e.getMessage());
        }
        return ResponseEntity.internalServerError().body("Some error occurred while raising request please try again.");
    }

    @PostMapping("/consentRequestStatus")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> consentRequestStatus(@RequestBody String requestDataStr) {
        if (requestDataStr == null) {
            return ResponseEntity.badRequest().body("Invalid or missing data in request");
        }
        String consentRequestId = null;
        try {
            JSONObject requestData = new JSONObject(requestDataStr);
            consentRequestId = requestData.optString("consentRequestId", null);
            if (consentRequestId == null) {
                return ResponseEntity.badRequest().body("Request is Invalid: It is missing Consent Request Id");
            }
            String token = abdmSessionService.getToken();
            if (token == null) {
                ResponseEntity.internalServerError().body("Abdm Server did not sent token...");
            }
            String abdmServerResponse = abdmService.checkConsentRequestStatus(consentRequestId, token);
            if (!abdmServerResponse.equalsIgnoreCase("true")) {
                return ResponseEntity.internalServerError().body("Failed to send request to ABDM...");
            }
        } catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.consentRequestStatus1> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            System.err.println("Some exception occurred in <DoctorController.consentRequestStatus2> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
        try {
            String consentRequestData = dataService.getData(consentRequestId);
            if (consentRequestData == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(consentRequestData);
        } catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.consentRequestStatus3> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
    }

//    @PostMapping("/getConsentRequestStatus")
//    @PreAuthorize("hasAuthority('doctor:post')")
//    public ResponseEntity<String> getConsentRequestStatus(@RequestBody String requestDataStr) {
//        try {
//            JSONObject requestData = new JSONObject(requestDataStr);
//            String consentRequestId = requestData.optString("consentRequestId", null);
//            if (consentRequestId == null) {
//                return ResponseEntity.badRequest().body("Request is Invalid: It is missing Consent Request Id");
//            }
//
//            String consentRequestData = dataService.getData(consentRequestId);
//            if (consentRequestData == null) {
//                return ResponseEntity.notFound().build();
//            }
//            return ResponseEntity.ok(consentRequestData);
//        } catch (JSONException e) {
//            System.err.println("Some exception occurred in <DoctorController.getConsentRequestStatus> method: " + e.getMessage());
//            return ResponseEntity.internalServerError().body("Something went wrong...");
//        }
//    }

    @PostMapping("/getArtefactIds")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> getArtefactIds(@RequestBody String requestDataStr) {
        try {
            JSONObject requestData = new JSONObject(requestDataStr);
            String consentRequestId = requestData.optString("consentRequestId", null);
            if (consentRequestId == null) {
                return ResponseEntity.badRequest().body("Request is Invalid: It is missing Consent Request Id");
            }
            String consentRequestArtefacts = dataService.getData(consentRequestId + "Artefacts");
            if (consentRequestArtefacts == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(consentRequestArtefacts);
        } catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.getArtefactIds> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
    }

    @PostMapping("/fetchArtefacts")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> fetchArtefact(@RequestBody String requestDataStr) {
        try {
            JSONObject requestData = new JSONObject(requestDataStr);
            String consentRequestArtefactId = requestData.optString("consentRequestArtefactId", null);
            if (consentRequestArtefactId == null) {
                return ResponseEntity.badRequest().body("Request is Invalid: It is missing Consent Request Artefact Id");
            }
            String token = abdmSessionService.getToken();
            if (token == null) {
                ResponseEntity.internalServerError().body("Abdm Server did not sent token...");
            }
            String abdmServerResponse = abdmService.getArtefacts(consentRequestArtefactId, token);
            if (!abdmServerResponse.equalsIgnoreCase("true")) {
                return ResponseEntity.internalServerError().body("Failed to send request to ABDM...");
            }
            return ResponseEntity.ok("Status request successfully sent...");
        } catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.fecthArtefact> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
    }

    @PostMapping("/getFetchedArtefact")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> getFetchedArtefact(@RequestBody String requestDataStr) {
        try {
            JSONObject requestData = new JSONObject(requestDataStr);
            String consentRequestArtefactId = requestData.optString("consentRequestArtefactId", null);
            if (consentRequestArtefactId == null) {
                return ResponseEntity.badRequest().body("Request is Invalid: It is missing Consent Request Artefact Id");
            }
            String fetchedArtefact = dataService.getData(consentRequestArtefactId + "fetchedArtefact");
            if (fetchedArtefact == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(fetchedArtefact);
        }  catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.getFetchedArtefact> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
    }

    @PostMapping("/healthInformationHiuRequest")
    @PreAuthorize("hasAuthority('doctor:post')")
    public ResponseEntity<String> healthInformationHiuRequest(@RequestBody String requestDataStr) {
        try {
            JSONObject response = new JSONObject(requestDataStr);
            String consentId = response.optString("consentId", null);
            String startDate = response.optString("startDate", null);
            String endDate = response.optString("endDate", null);
            String expiryDate = response.optString("expiryDate", null);
            if (consentId == null || startDate == null || endDate == null || expiryDate == null) {
                return ResponseEntity.badRequest().body("Request is Invalid: It is missing required data...");
            }
            String token = abdmSessionService.getToken();
            if (token == null) {
                ResponseEntity.internalServerError().body("Abdm Server did not sent token...");
            }
            String abdmServerResponse = abdmService.sendHealthInformationRequest(consentId, startDate, endDate, expiryDate, token);
            if (!abdmServerResponse.equalsIgnoreCase("true")) {
                return ResponseEntity.internalServerError().body("Failed to send health information request to ABDM...");
            }
            return ResponseEntity.ok("Status request successfully sent...");
        } catch (Exception e) {
            System.err.println("Some exception occurred in <DoctorController.healthInformationCmRequest> method: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Something went wrong...");
        }
    }
}