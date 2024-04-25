package com.example.HAD.Backend.controller;


import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.example.HAD.Backend.dto.MedicalRecordsDTO;
import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.entities.ConsentArtifact;
import com.example.HAD.Backend.entities.MedicalRecords;
import com.example.HAD.Backend.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import org.hl7.fhir.r4.model.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.FileWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import com.example.HAD.Backend.entities.Patient;
import com.example.HAD.Backend.service.AbdmService;
import com.example.HAD.Backend.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:9191")
public class WebhookController {

    private JSONObject resultJson = null;

    private Map<String, String> patientData = null;

    @Autowired
    private PatientService patientService;

    @Autowired
    private ConsentArtifactService consentArtifactService;

    @Autowired
    private AbdmSessionService abdmSessionService;

    @Autowired
    private AbdmService abdmService;

    @Autowired
    private MedicalRecordsService medicalRecordsService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DataService dataService;

    @Value("${callback.url}")
    private String callbackUrl;

    @PostMapping("/v0.5/users/auth/on-fetch-modes")
    public void authFetchModes(@RequestBody Map<String, Object> body) throws JsonProcessingException {
        if (body == null || body.containsKey("error")) {
            System.out.println("An error occurred while processing the Aadhaar OTP request.");
            return;
        }
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(body));
    }

    @PostMapping("/v0.5/users/auth/on-init")
    public void userAuthInit(@RequestBody String body) {
        try {
            resultJson = new JSONObject();
            if (body == null) {
                System.err.println("ABDM Server did not send any response...");

                resultJson.put("transactionId", JSONObject.NULL);
                JSONObject errorObject = new JSONObject();
                errorObject.put("code", 911);
                errorObject.put("message", "ABDM Server did not send any response...");
                resultJson.put("error", errorObject);
            } else {
                JSONObject jsonObject = new JSONObject(body);
                JSONObject auth = jsonObject.optJSONObject("auth");
                if (auth != null) {
                    String transactionId = auth.getString("transactionId");
                    System.out.println("TransactionId as received by authOnInit callback api: " + transactionId);
//                    String timeStampStr = jsonObject.optString("timestamp");
//                    dataService.putData("transactionId", Map.of(
//                            timeStampStr, transactionId
//                    ));
                    resultJson.put("transactionId", transactionId);
                    resultJson.put("error", JSONObject.NULL);
                } else {
                    JSONObject error = jsonObject.getJSONObject("error");
                    String errorCode = error.getString("code");
                    String errorMessage = error.getString("message");
                    System.err.println("Error Code: " + errorCode + " received with message " + errorMessage);

                    resultJson.put("transactionId", JSONObject.NULL);
                    JSONObject errorObject = new JSONObject();
                    errorObject.put("code", errorCode);
                    errorObject.put("message", errorMessage);
                    resultJson.put("error", errorObject);
                }
                System.out.println("Printed from <userAuthInit>" + resultJson.toString());
            }
        } catch (JSONException je) {
            System.err.println(je.getMessage());
        }
    }

    @PostMapping("/v0.5/consents/hip/notify")
    public ResponseEntity<String> StoreConsentArtifact(@RequestBody String response) throws Exception {
        System.out.println("Entering StoreConsentArtifact");

        ConsentArtifact consentArtifact = new ConsentArtifact();
        JSONObject jsonObject = new JSONObject(response);
        consentArtifact.setConsentId(jsonObject.getJSONObject("notification").getString("consentId"));
        consentArtifact.setPurpose(jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("purpose").getString("text"));
        consentArtifact.setRequestId(jsonObject.getString("requestId"));

        // Extracting hiTypes
//        JSONArray hiTypesArray = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONArray("hiTypes");
//        List<String> hiTypesList = new ArrayList<>();
//        for (int i = 0; i < hiTypesArray.length(); i++) {
//            hiTypesList.add(hiTypesArray.getString(i));
//        }
//        consentArtifact.setHiType(hiTypesList);

        // Extracting careContexts
        JSONArray careContextsArray = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONArray("careContexts");
        List<Integer> appointmentIdsList = new ArrayList<>();
        for (int i = 0; i < careContextsArray.length(); i++) {
            JSONObject careContextNode = careContextsArray.getJSONObject(i);
            String careContextReference = careContextNode.getString("careContextReference");
            appointmentIdsList.add(Integer.valueOf(careContextReference));
        }
        consentArtifact.setAppointmentIds(appointmentIdsList);

        // Parsing date fields
        String fromDate = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("permission").getJSONObject("dateRange").getString("from");
        consentArtifact.setFromDate(LocalDate.parse(fromDate.substring(0, 10)));

        String toDate = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("permission").getJSONObject("dateRange").getString("to");
        consentArtifact.setToDate(LocalDate.parse(toDate.substring(0, 10)));

        String eraseDate = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("permission").getString("dataEraseAt");
        consentArtifact.setEraseDate(LocalDate.parse(eraseDate.substring(0, 10)));

        // Parsing time
        String time = jsonObject.getJSONObject("notification").getJSONObject("consentDetail").getJSONObject("permission").getJSONObject("dateRange").getString("to");
        consentArtifact.setTime(LocalTime.parse(time.substring(11, 19)));

        // Setting status
        consentArtifact.setStatus(jsonObject.getJSONObject("notification").getString("status"));

        // Adding consentArtifact
        consentArtifactService.addConsentArtifact(consentArtifact);
        System.out.println("Added Consent Artifact Successfully");

        // Generating Acknowledgment for received consent
        JSONObject request = new JSONObject();
        request.put("requestId", UUID.randomUUID().toString());
        request.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        JSONObject acknowledgement = new JSONObject();
        acknowledgement.put("status", "OK");
        acknowledgement.put("consentId", consentArtifact.getConsentId());

        JSONObject error = new JSONObject();
        error.put("code", 1000);
        error.put("message", "string");

        JSONObject resp = new JSONObject();
        resp.put("requestId", consentArtifact.getRequestId());

        request.put("acknowledgement", acknowledgement);
        request.put("error", error);
        request.put("resp", resp);

        // Sending acknowledgment
        String authToken = abdmSessionService.getToken();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authToken);
        headers.set("X-CM-ID", "sbx");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
        ResponseEntity<String> acknowledgment = restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/consents/hip/on-notify", HttpMethod.POST, entity, String.class);

        System.out.println(acknowledgment);
        return ResponseEntity.ok("Stored Consent Artifact.");
    }

    @GetMapping("/getTransactionId")
    public ResponseEntity<?> getTransactionId() {
        try {
            System.out.println("Printed from <getTransactionId>: " + (resultJson != null ? resultJson.toString() : "null"));

            if (resultJson == null) {
                JSONObject errorResponse = new JSONObject();
                errorResponse.put("error", "Webhooks.site is not receiving callbacks!!!");
                errorResponse.put("transactionId", JSONObject.NULL);
                return ResponseEntity.badRequest().body(errorResponse.toString());
            }
            return ResponseEntity.ok(resultJson.toString());
        } catch (JSONException je) {
            System.err.println(je.getMessage());
            return ResponseEntity.internalServerError().body("{\"error\": \"Critical JSON processing error...\"}");
        }
    }

    @PostMapping("/v0.5/users/auth/on-confirm")
    public void confirmAuthInit(@RequestBody Map<String, Object> body) {

        try {
            if (body == null) {
                System.err.println("ABDM Server did not send any response...");

                resultJson.put("transactionId", JSONObject.NULL);
                JSONObject errorObject = new JSONObject();
                errorObject.put("code", 911);
                errorObject.put("message", "ABDM Server did not send any response...");
                resultJson.put("error", errorObject);
            } else {

                JSONObject requestBody = new JSONObject(body);

                JSONObject auth = requestBody.optJSONObject("auth");
                if (auth == null) {
                    System.err.println("Auth is missing in ABDM response DB ot updated...");
                } else {

                    String accessToken = auth.optString("accessToken");

                    JSONObject patientInfo = auth.optJSONObject("patient");
                    if (patientInfo == null) {
                        System.err.println("Patient information is missing...");
                    }
                    String abhaAddress = patientInfo != null ? patientInfo.optString("id") : null;
                    String name = patientInfo != null ? patientInfo.optString("name") : null;
                    String gender = patientInfo != null ? patientInfo.optString("gender") : null;
                    int yearOfBirth = patientInfo != null ? patientInfo.optInt("yearOfBirth") : 0;
                    int monthOfBirth = patientInfo != null ? patientInfo.optInt("monthOfBirth") : 0;
                    int dayOfBirth = patientInfo != null ? patientInfo.optInt("dayOfBirth") : 0;

                    JSONArray identifiers = patientInfo != null ? patientInfo.optJSONArray("identifiers") : null;
                    if (identifiers == null) {
                        System.err.println("Patient Identifier information is missing...");
                    }
                    String mobileNumber = null;
                    String abhaNumber = null;
                    for (int i = 0; i < (identifiers != null ? identifiers.length() : 0); i++) {
                        JSONObject identifier = identifiers.getJSONObject(i);
                        if ("MOBILE".equals(identifier.getString("type"))) {
                            mobileNumber = identifier.getString("value");
                        } else if ("NDHM_HEALTH_NUMBER".equals(identifier.getString("type"))) {
                            abhaNumber = identifier.getString("value");
                        }
                    }
                    if (mobileNumber == null || abhaNumber == null) {
                        System.err.println("Patient mobile number or abha number is missing...");
                    }

                    if (yearOfBirth == 0 || monthOfBirth == 0 || dayOfBirth == 0) {
                        System.err.println("Date of birth components are missing...");
                    }
                    LocalDate dateOfBirth = LocalDate.of(yearOfBirth, monthOfBirth, dayOfBirth);
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                    String dob = dateOfBirth.format(formatter);

//                        JSONObject patientData = new JSONObject();
//                        patientData.put("accessToken", accessToken);
//                        patientData.put("abhaNumber", abhaNumber);
//                        patientData.put("abhaAddress", abhaAddress);
//                        patientData.put("name", name);
//                        patientData.put("gender", gender);
//                        patientData.put("dateOfBirth", dob);
//                        patientData.put("mobileNumber", mobileNumber);


                    // Assuming Patient is a model managed by patientService
                    Patient patient = new Patient();
                    patient.setName(name);
                    patient.setAbhaId(abhaAddress);
                    patient.setMobileNo(mobileNumber);
                    patient.setDob(dateOfBirth);
                    patient.setGender(gender);
                    patient.setAccessToken(accessToken);
                    System.out.println("From on-confirm: " + patient);
                    patientService.addPatient(patient);
                }
            }
        } catch (JSONException je) {
            System.err.println("Failed to process patient data: " + je.getMessage());
        }
    }

    @PostMapping("/v0.5/health-information/hip/request")
    public Integer healthRecordsHipRequest(@RequestBody String response) throws Exception {
        System.out.println("Entering healthRecordsHipRequest");

        JSONObject jsonObject = new JSONObject(response);
        String consentId = (String) jsonObject.getJSONObject("hiRequest").getJSONObject("consent").get("id");
        String dataPushUrl = (String) jsonObject.getJSONObject("hiRequest").get("dataPushUrl");
        String publicKey = (String) jsonObject.getJSONObject("hiRequest").getJSONObject("keyMaterial").getJSONObject("dhPublicKey").get("keyValue");;
        String nonce = (String) jsonObject.getJSONObject("hiRequest").getJSONObject("keyMaterial").get("nonce");;
        String requestId = (String) jsonObject.get("requestId");
        String transactionId = (String) jsonObject.get("transactionId");
        abdmService.sendHipOnRequest(requestId, transactionId);

        ConsentArtifact consentArtifact = consentArtifactService.findConsentId(consentId);
        List<Integer> appointmentIdList = consentArtifact.getAppointmentIds();

        for (Integer appointmentId : appointmentIdList) {

            Bundle bundle = convertMedicalRecordToBundle(appointmentId);
            if (bundle == null ) {
                continue;
            }
            FhirContext ctx = FhirContext.forR4();
            IParser parser = ctx.newJsonParser();
            String bundleString = parser.encodeResourceToString(bundle);
            System.out.println("BUNDLE CREATED");
            System.out.println(bundleString);
            try{
                FileWriter fw=new FileWriter("bundle",false );
                fw.write(bundleString);
                fw.close();
            }catch(Exception e){System.out.println(e);}
            System.out.println("Success...");

            String keys = abdmService.getEncryptionKeys();
            JSONObject keyObject = new JSONObject(keys);

            String HIP_PRIVATE_KEY = keyObject.get("privateKey").toString();
            String HIP_PUBLIC_KEY = keyObject.get("publicKey").toString();
            String HIP_NONCE = keyObject.get("nonce").toString();

            String encryptedResponse = abdmService.getEncryptedData(bundleString, publicKey, nonce, HIP_PUBLIC_KEY, HIP_PRIVATE_KEY, HIP_NONCE);
            abdmService.sendEncryptedData(dataPushUrl, encryptedResponse, nonce, appointmentIdList);
            abdmService.sendTransferStatus(transactionId, consentId, appointmentIdList.get(0));
        }
        return 200;
    }

//    -------M3 starts-------

    @PostMapping("/v0.5/consent-requests/on-init")
    public void consentRequestsOnInit(@RequestBody String response) {
        try {
            resultJson = new JSONObject();
            if (response == null) {
                System.err.println("ABDM Server did not send any response...");

                resultJson.put("consentRequestId", JSONObject.NULL);
                JSONObject errorObject = new JSONObject();
                errorObject.put("code", 911);
                errorObject.put("message", "ABDM Server did not send any response...");
                resultJson.put("error", errorObject);
            } else {
                JSONObject jsonObject = new JSONObject(response);
                JSONObject consentRequest = jsonObject.optJSONObject("consentRequest");
                if (consentRequest != null) {
                    String consentRequestId = consentRequest.getString("id");
                    System.out.println("consentRequestId as received by <WebhookController.consentRequestsOnInit>: " + consentRequestId);
                    resultJson.put("consentRequestId", consentRequestId);
                    resultJson.put("error", JSONObject.NULL);
                } else {
                    JSONObject error = jsonObject.getJSONObject("error");
                    System.err.println("Error Code: " + error.getString("code") + " received with message " + error.getString("message"));

                    resultJson.put("consentRequestId", JSONObject.NULL);
                    resultJson.put("error", error);
                }
            }
            dataService.putData("consentRequestOnInit", resultJson.toString());
            System.out.println("Printed from <WebhookController.consentRequestsOnInit>: " + resultJson.toString());
        } catch (JSONException je) {
            System.err.println("Something went wrong in <WebhookController.consentRequestsOnInit>: " + je.getMessage());
        }
    }
    @GetMapping("/getConsentRequestId")
    public ResponseEntity<?> getConsentRequestId() {
        try {
            System.out.println("Printed from <WebhookController.getConsentRequestId>: " + (resultJson != null ? resultJson.toString() : "null"));

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
    }
    @PostMapping("/v0.5/consent-requests/on-status")
    public void consentRequestOnStatus(@RequestBody String response) {
        try {
            if (response == null) {
                System.err.println("ABDM Server did not send any response...");

                JSONObject errorObject = new JSONObject();
                errorObject.put("code", 911);
                errorObject.put("message", "ABDM Server did not send any response...");
                dataService.putData("consentRequestError", errorObject.toString());
            } else {
                JSONObject jsonObject = new JSONObject(response);
                JSONObject consentRequest = jsonObject.optJSONObject("consentRequest");
                if (consentRequest != null) {
                    String consentRequestId = consentRequest.getString("id");
                    String consentRequestStatus = consentRequest.getString("status");
                    System.out.println("consentRequestId as received by <WebhookController.consentRequestOnStatus>: " + consentRequestId);
                    JSONObject payload = new JSONObject();
                    payload.put("consentRequestId", consentRequestId);
                    payload.put("consentRequestStatus", consentRequestStatus);
                    dataService.putData(consentRequestId, payload.toString()); // Store using the consentRequestId as key
                } else {
                    JSONObject error = jsonObject.getJSONObject("error");
                    String errorCode = error.getString("code");
                    String errorMessage = error.getString("message");
                    System.err.println("Error Code: " + errorCode + " received with message " + errorMessage);
                    JSONObject errorPayload = new JSONObject();
                    errorPayload.put("errorCode", errorCode);
                    errorPayload.put("errorMessage", errorMessage);
                    dataService.putData("error", errorPayload.toString());
                }
                System.out.println("Printed from <WebhookController.consentRequestsOnInit>: " + jsonObject.toString());
            }
        } catch (JSONException je) {
            System.err.println("Something went wrong in <WebhookController.consentRequestsOnInit>: " + je.getMessage());
        }
    }

    @PostMapping("/v0.5/consents/hiu/notify")
    public void consentsHiuNotify(@RequestBody String responseStr) {
        try {
            JSONObject response = new JSONObject(responseStr);
            String requestId = response.optString("requestId", null);
            System.out.println("Printed from <WebhookController.consentRequestsOnInit>:");
            System.out.println(">> requestId: " + requestId);
            JSONArray consentArtefacts = response.getJSONObject("notification").getJSONArray("consentArtefacts");
//            for (int i = 0; i < consentArtefacts.length(); i++) {
//                JSONObject artefact = consentArtefacts.getJSONObject(i);
//                String id = artefact.getString("id");
//                System.out.println("ID: " + id);
//            }
            JSONObject artefact = consentArtefacts.getJSONObject(0);
            String consentArtefactId = artefact.getString("id");
            System.out.println(">> consentArtefactId: " + consentArtefactId);

            String token = abdmSessionService.getToken();

            String responseFromHiuOnNotify = abdmService.consentsHiuOnNotify(requestId, consentArtefactId, token);

            if (responseFromHiuOnNotify.equalsIgnoreCase("true")) {
                System.out.println("Acknowledgment sent back for hiu notification on consent request grant...");
            } else {
                System.err.println(responseStr);
                System.err.println("Acknowledgment not sent back for hiu notification on consent request, due to some error...");
            }

            String status = response.getJSONObject("notification").optString("status", "no status found!!!");
            System.out.println(status);
            if (status.equals("GRANTED")) {
                String consentRequestId = response.getJSONObject("notification").optString("consentRequestId", null);
                dataService.putData(consentRequestId + "Artefacts", response.getJSONObject("notification").getJSONArray("consentArtefacts").toString());
            }
        } catch (Exception e) {
            System.err.println("Something went wrong in <WebhookController.consentsHiuNotify>: " + e.getMessage());
        }
    }

    @PostMapping("/v0.5/consents/on-fetch")
    public void consentRequestOnFetch(@RequestBody String responseStr) {
        try {
            JSONObject response = new JSONObject(responseStr);
            String consentRequestArtefactId = response.getJSONObject("consent").getJSONObject("consentDetail").getString("consentId");
            dataService.putData(consentRequestArtefactId + "fetchedArtefact", responseStr);
        } catch (Exception e) {
            System.err.println("Something went wrong in <WebhookController.consentRequestOnFetch>: " + e.getMessage());
        }
    }

    @PostMapping("/v0.5/health-information/hiu/on-request")
    public void healthInformationHiuOnRequest(@RequestBody String responseStr) {
        try {
            JSONObject response = new JSONObject(responseStr);
            String healthInformationRequestTransactionId = response.getJSONObject("hiRequest").optString("transactionId", null);
            String healthInformationRequestSessionStatus = response.getJSONObject("hiRequest").optString("sessionStatus", null);
            dataService.putData("healthInformationRequestTransactionId", healthInformationRequestTransactionId);
            dataService.putData("healthInformationRequestSessionStatus", healthInformationRequestSessionStatus);
        } catch (Exception e) {
            System.err.println("Something went wrong in <WebhookController.healthInformationHiuOnRequest>: " + e.getMessage());
        }
    }

    // below will receive data from another webhook configured for data push url
    @PostMapping("/data/push")
    public void healthInformationReceiver(@RequestBody String responseStr) {
        try {
            JSONObject response = new JSONObject(responseStr);
            // TODO: Complete this method
        }  catch (Exception e) {
            System.err.println("Something went wrong in <WebhookController.healthInformationReceiver>: " + e.getMessage());
        }
    }

//    -------M3 ends-------

    private Bundle convertMedicalRecordToBundle(Integer appointmentId) {
        try {
            Bundle bundle = new Bundle();

            String UUIDCode = UUID.randomUUID().toString();
            bundle.setId(UUIDCode);

            bundle.setMeta(new Meta().setVersionId("1"));
            bundle.setIdentifier(new Identifier()
                    .setSystem(callbackUrl)
                    .setValue(UUID.randomUUID().toString()));

            bundle.setType(Bundle.BundleType.DOCUMENT);
            bundle.setTimestamp(new Date());

            List<Bundle.BundleEntryComponent> bundleEntryComponentList = new ArrayList<>();
            Bundle.BundleEntryComponent compositionEntry = new Bundle.BundleEntryComponent();
            compositionEntry.setFullUrl("Composition/" + "comp-" + appointmentId);
            compositionEntry.setResource(getMedicalRecordFromAppointmentId(appointmentId));
            bundleEntryComponentList.add(compositionEntry);

            Optional<Appointment> appointmentRecord = appointmentService.findAppointmentById(appointmentId);
            Appointment appointment = appointmentRecord.orElseThrow(() -> new NoSuchElementException("Appointment not found with ID: " + appointmentId));

            Bundle.BundleEntryComponent patientEntry = new Bundle.BundleEntryComponent();
            patientEntry.setFullUrl("Patient/" + "patient-" + appointment.getPatient().getPatientId());
            org.hl7.fhir.r4.model.Patient patient = getPatient(appointment);
            patientEntry.setResource(patient);
            bundleEntryComponentList.add(patientEntry);

            Bundle.BundleEntryComponent practitionerEntry = new Bundle.BundleEntryComponent();
            practitionerEntry.setFullUrl("Practitioner/" + "practitioner-" + appointment.getDoctor().getDoctorId());
            Practitioner practitioner = getPractitioner(appointment);
            practitionerEntry.setResource(practitioner);
            bundleEntryComponentList.add(practitionerEntry);

            Bundle.BundleEntryComponent encounterEntry = new Bundle.BundleEntryComponent();
            encounterEntry.setFullUrl("Encounter/" + "encounter-" + appointmentId);
            encounterEntry.setResource(getEncounter(appointment));
            bundleEntryComponentList.add(encounterEntry);

            MedicalRecords medicalRecords = medicalRecordsService.getPatientConsultationRecord(appointmentId);

            Bundle.BundleEntryComponent bundleEntryComponent = new Bundle.BundleEntryComponent();
            if (medicalRecords != null) {
                bundleEntryComponent.setFullUrl("Binary/" + "visit-doc-" + medicalRecords.getRecordId());
            } else {
                bundleEntryComponent.setFullUrl("Binary/" + "visit-doc-" + appointment.getAppointmentId());
            }

            bundleEntryComponent.setResource(getBinaryFromVisit(appointment));
            bundleEntryComponentList.add(bundleEntryComponent);

            bundle.setEntry(bundleEntryComponentList);
            return bundle;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Binary getBinaryFromVisit(Appointment appointment) {
        Binary binary = new Binary();

        MedicalRecords medicalRecords = medicalRecordsService.getPatientConsultationRecord(appointment.getAppointmentId());
        if ( medicalRecords == null) {
            binary.setId("visit-doc-"+appointment.getAppointmentId());
        } else {
            binary.setId("visit-doc-"+medicalRecords.getRecordId());
        }

        try{
            if(Objects.equals(appointment.getStatus(), "absent")) throw new Exception();
            assert medicalRecords != null;
            MedicalRecordsDTO medicalRecordsDTO = new MedicalRecordsDTO(medicalRecords);

            String decodedString = new Gson().toJson(medicalRecordsDTO);
            String contentType = decodedString.split(":",2)[1].split(";",2)[0];//data:application/pdf;base64
            binary.setContentType(contentType);
            binary.setContent(decodedString.getBytes());
            return binary;
        }
        catch(Exception e) {
            System.out.println("EXCEPTION:  "+e.toString());
            String jsonData = "{\"reasonOfVisit\":\""+appointment.getReasonForVisit()+"\"}";
            binary.setContentType("application/json");
            binary.setContent(Base64.getEncoder().encodeToString(jsonData.getBytes()).getBytes());
            return binary;
        }
    }

    private Encounter getEncounter(Appointment appointment) {
        Encounter encounter = new Encounter();
        //SETTING ID
        encounter.setId("encounter-"+appointment.getAppointmentId());
        encounter.setStatus(Encounter.EncounterStatus.FINISHED);
        encounter.setClass_(new Coding(
                "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                "AMB",
                "ambulatory"));
        return encounter;
    }

    private Practitioner getPractitioner(Appointment appointment) {
        Practitioner practitioner = new Practitioner();

        practitioner.setId("practitioner-"+appointment.getDoctor().getDoctorId());
        //SETTING IDENTIFIER
        Identifier identifier = new Identifier();
        identifier.setType((new CodeableConcept(new Coding(
                "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-identifier-type-code",
                "ABHA",
                "Ayushman Bharat Health Account (ABHA) ID"))));
        identifier.setSystem("https://healthid.ndhm.gov.in");
        identifier.setValue(appointment.getDoctor().getDoctorLicenseNo());
        practitioner.setIdentifier(Collections.singletonList(identifier));
        return practitioner;
    }

    private org.hl7.fhir.r4.model.Patient getPatient(Appointment appointment) {
        org.hl7.fhir.r4.model.Patient patient = new org.hl7.fhir.r4.model.Patient();

        patient.setId("patient-"+appointment.getPatient().getPatientId());
        //SETTING IDENTIFIER
        Identifier identifier = new Identifier();
        identifier.setType((new CodeableConcept(new Coding(
                "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-identifier-type-code",
                "ABHA",
                "Ayushman Bharat Health Account (ABHA) ID"))));
        identifier.setSystem("https://healthid.ndhm.gov.in");
        identifier.setValue(appointment.getPatient().getAbhaId());
        patient.setIdentifier(Collections.singletonList(identifier));
        return patient;
    }

    private Composition getMedicalRecordFromAppointmentId(Integer appointmentId) {
        Composition composition = new Composition();

        Optional<Appointment> appointmentRecord = appointmentService.findAppointmentById(appointmentId);
        Appointment appointment = appointmentRecord.orElseThrow(() -> new NoSuchElementException("Appointment not found with ID: " + appointmentId));

        composition.setId("comp-"+appointment.getAppointmentId());
        composition.setStatus(Composition.CompositionStatus.FINAL);
        composition.setType(new CodeableConcept(new Coding(
                "http://snomed.info/sct",
                "371530004",
                "Clinical Consultation Report"))); // SETTING record type

        Reference patientReference = new Reference("Patient/"+"patient-"+appointment.getPatient().getPatientId());
        patientReference.setDisplay(appointment.getPatient().getName());
        composition.setSubject(patientReference);

        Reference practitionerReference = new Reference("Practitioner/"+"practitioner-"+appointment.getDoctor().getDoctorId());
        practitionerReference.setDisplay(appointment.getDoctor().getName());
        composition.setAuthor(Collections.singletonList(practitionerReference));

        Reference encounterReference = new Reference("Encounter/"+"encounter-"+ appointmentId);
        composition.setEncounter(encounterReference);

        try {
            composition.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(String.valueOf(appointment.getDate())));
        } catch (ParseException e) {
            // Handle parsing exception
            e.printStackTrace(); // or log the error
        }

        composition.setTitle(appointment.getReasonForVisit());

        MedicalRecords medicalRecords = medicalRecordsService.getPatientConsultationRecord(appointmentId);

        Composition.SectionComponent sectionComponent = new Composition.SectionComponent();
        Reference reference = new Reference("Binary/visit-doc-" + medicalRecords.getRecordId());
        reference.setDisplay("Visit Document " + medicalRecords.getRecordId());
        sectionComponent.setEntry(Collections.singletonList(reference));
        composition.setSection(Collections.singletonList(sectionComponent));

        return composition;
    }
}