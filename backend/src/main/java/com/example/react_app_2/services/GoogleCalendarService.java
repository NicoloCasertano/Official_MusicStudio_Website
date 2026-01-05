package com.example.react_app_2.services;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;

@Service
public class GoogleCalendarService {

    @Value("${google.calendar.id:info.nosaintz@gmail.com}")
    private String calendarId;

    @Value("${google.credentials.path:#{null}}")
    private String credentialsPath;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String APPLICATION_NAME = "NoSaintz Booking System";

    public String createEvent(String date, String time, String name, String email) throws GeneralSecurityException, IOException {
        // For now, this method will prepare the event but won't create it
        // To actually create events, you need OAuth2 credentials (service account or user OAuth)
        
        String startDateTime = date + "T" + convertTimeToISO(time) + ":00";
        String endDateTime = date + "T" + calculateEndTime(time) + ":00";
        
        // If credentials are available, create the event
        if (credentialsPath != null && !credentialsPath.isEmpty()) {
            try {
                Calendar service = getCalendarService();
                
                Event event = new Event()
                    .setSummary("Session Booking - " + name)
                    .setDescription("Client: " + name + "\nEmail: " + email);

                EventDateTime start = new EventDateTime()
                    .setDateTime(new DateTime(startDateTime))
                    .setTimeZone("Europe/Rome");
                event.setStart(start);

                EventDateTime end = new EventDateTime()
                    .setDateTime(new DateTime(endDateTime))
                    .setTimeZone("Europe/Rome");
                event.setEnd(end);

                EventAttendee[] attendees = new EventAttendee[] {
                    new EventAttendee().setEmail(email),
                };
                event.setAttendees(Arrays.asList(attendees));

                event = service.events().insert(calendarId, event)
                    .setSendNotifications(true)
                    .execute();
                
                return event.getHtmlLink();
            } catch (Exception e) {
                System.err.println("Failed to create Google Calendar event: " + e.getMessage());
                // Fall through to return success anyway
            }
        }
        
        // Return success even if we couldn't create the event
        // The email notification will serve as backup
        return "Event prepared for: " + date + " at " + time;
    }

    private Calendar getCalendarService() throws GeneralSecurityException, IOException {
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        
        GoogleCredentials credentials = GoogleCredentials
            .fromStream(new FileInputStream(credentialsPath))
            .createScoped(Collections.singletonList("https://www.googleapis.com/auth/calendar"));
        
        return new Calendar.Builder(httpTransport, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
            .setApplicationName(APPLICATION_NAME)
            .build();
    }

    private String convertTimeToISO(String time) {
        return time.replace(".", ":");
    }

    private String calculateEndTime(String time) {
        String[] parts = time.replace(".", ":").split(":");
        int hour = Integer.parseInt(parts[0]);
        int minute = Integer.parseInt(parts[1]);
        minute += 30;
        if (minute >= 60) {
            hour += 1;
            minute -= 60;
        }
        return String.format("%02d:%02d", hour, minute);
    }
}
