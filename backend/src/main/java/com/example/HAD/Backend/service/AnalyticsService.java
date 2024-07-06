package com.example.HAD.Backend.service;

import com.example.HAD.Backend.dto.AnalyticsDTO;
import com.example.HAD.Backend.dto.AppointmentDTO;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.example.HAD.Backend.dto.DoctorListDTO;
import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.repository.AppointmentRepository;
import com.example.HAD.Backend.repository.DoctorRepository;
import com.example.HAD.Backend.repository.PatientRepository;
import com.example.HAD.Backend.repository.ReceptionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public AnalyticsDTO generateAnalyticsData() {
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.countActiveDoctors();
        long totalReceptionists = receptionistRepository.countActiveReceptionists();

        return new AnalyticsDTO(totalPatients, totalDoctors, totalReceptionists);
    }


    public Map<String, Integer> getDoctorCountBySpeciality(List<DoctorListDTO> doctorListDTOS) {
//        ResponseEntity<DoctorListDTO[]> response = restTemplate.getForEntity("http://localhost:9191/receptionist/doctorList", DoctorListDTO[].class);
//        DoctorListDTO[] doctors = response.getBody();
        Map<String, Integer> doctorCountBySpeciality = new HashMap<>();
        if (doctorListDTOS != null) {
            for (DoctorListDTO doctor : doctorListDTOS) {
                if (doctor.isStatus()) {
                    String speciality = doctor.getSpeciality();
                    doctorCountBySpeciality.put(speciality, doctorCountBySpeciality.getOrDefault(speciality, 0) + 1);
                }
            }
        }
        return doctorCountBySpeciality;
    }


    public Map<String, Integer> getAppointmentCountByDay() {
        // Fetch appointment data from repository
        List<Appointment> appointments = appointmentRepository.findAll();

        // Create a map to store appointment count for each day
        Map<String, Integer> appointmentCountByDay = new HashMap<>();

        // Iterate through the appointments and aggregate the count for each day
        for (Appointment appointment : appointments) {
            String date = appointment.getDate().toString(); // Assuming date is stored as LocalDate
            appointmentCountByDay.put(date, appointmentCountByDay.getOrDefault(date, 0) + 1);
        }

        return appointmentCountByDay;
    }

    public Map<String, Long> getPatientCountByAppointmentSpeciality() {
        List<DoctorListDTO> doctors = doctorRepository.getDoctors();

        Map<String, Long> patientCountBySpeciality = new HashMap<>();
        for (DoctorListDTO doctor : doctors) {
            String speciality = doctor.getSpeciality();
            long appointmentCount = appointmentRepository.countByDoctorId(doctor.getDoctorId());
            patientCountBySpeciality.put(speciality, patientCountBySpeciality.getOrDefault(speciality, 0L) + appointmentCount);
        }
        return patientCountBySpeciality;
    }

}
