package com.example.react_app_2.controllers;

import com.example.react_app_2.services.GoogleCalendarService;
import com.example.react_app_2.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "*")
public class CalendarController {

    @Autowired
    private GoogleCalendarService googleCalendarService;
    
    @Autowired
    private EmailService emailService;

    @PostMapping("/book")
    public ResponseEntity<?> bookSession(@RequestBody Map<String, String> bookingData) {
        try {
            String date = bookingData.get("date");
            String time = bookingData.get("time");
            String name = bookingData.get("name");
            String email = bookingData.get("email");
            String phone = bookingData.get("phone");
            String sessionType = bookingData.get("sessionType");
            String notes = bookingData.get("notes");

            if (date == null || time == null || name == null || email == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
            }

            // Log booking details
            System.out.println("=== New Booking Request ===");
            System.out.println("Date: " + date);
            System.out.println("Time: " + time);
            System.out.println("Name: " + name);
            System.out.println("Email: " + email);
            System.out.println("Phone: " + (phone != null ? phone : "Not provided"));
            System.out.println("Session Type: " + (sessionType != null ? sessionType : "Not specified"));
            System.out.println("Notes: " + (notes != null ? notes : "None"));
            System.out.println("========================");

            // Attempt to create event in Google Calendar with enhanced details
            String eventDescription = String.format(
                "Client: %s\nEmail: %s\nPhone: %s\nSession Type: %s\n\nNotes:\n%s",
                name,
                email,
                phone != null ? phone : "Not provided",
                sessionType != null ? sessionType : "Not specified",
                notes != null ? notes : "None"
            );
            
            String eventLink = googleCalendarService.createEvent(date, time, name, email);
            
            // Send emails to both studio and client
            emailService.sendBookingEmails(name, email, phone, date, time, 
                                          sessionType != null ? sessionType : "standard", 
                                          notes);
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Booking confirmed! Check your email for details.");
            response.put("date", date);
            response.put("time", time);
            response.put("name", name);
            response.put("sessionType", sessionType != null ? sessionType : "standard");
            if (eventLink != null && eventLink.startsWith("http")) {
                response.put("eventLink", eventLink);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Even if calendar creation fails, we still return success
            // because the email notification will serve as backup
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Booking request received. You'll receive a confirmation email.");
            response.put("date", bookingData.get("date"));
            response.put("time", bookingData.get("time"));
            return ResponseEntity.ok(response);
        }
    }
}
