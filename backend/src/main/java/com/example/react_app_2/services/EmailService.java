package com.example.react_app_2.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:info.nosaintz@gmail.com}")
    private String fromEmail;

    public void sendBookingEmails(String clientName, String clientEmail, String phone, 
                                   String date, String time, String sessionType, String notes) {
        try {
            // Send email to studio
            sendStudioEmail(clientName, clientEmail, phone, date, time, sessionType, notes);
            
            // Send confirmation email to client
            sendClientEmail(clientName, clientEmail, date, time, sessionType);
            
            System.out.println("✅ Emails sent successfully to both studio and client");
        } catch (Exception e) {
            System.err.println("⚠️ Email sending failed: " + e.getMessage());
            // Don't throw exception - email is not critical for booking
        }
    }

    private void sendStudioEmail(String clientName, String clientEmail, String phone,
                                 String date, String time, String sessionType, String notes) 
            throws MessagingException {
        
        if (mailSender == null) {
            System.out.println("⚠️ Mail sender not configured - skipping studio email");
            return;
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo("info.nosaintz@gmail.com");
        helper.setSubject("🎵 New Booking Request - " + sessionType);

        String htmlContent = String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #808080; border-bottom: 2px solid #808080; padding-bottom: 10px;">
                        🎵 New Booking Request
                    </h2>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #555;">📋 Booking Details</h3>
                        
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">📅 Date:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">⏰ Time:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">🎵 Session Type:</td>
                                <td style="padding: 8px 0; text-transform: capitalize;">%s</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background: #fff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #808080;">
                        <h3 style="margin-top: 0; color: #555;">👤 Client Information</h3>
                        
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                                <td style="padding: 8px 0;"><a href="mailto:%s">%s</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                        </table>
                    </div>
                    
                    %s
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999;">
                        <p>This is an automated message from NoSaintz Booking System</p>
                        <p style="font-size: 12px;">Received at: %s</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            date, time, sessionType, clientName, clientEmail, clientEmail,
            phone != null && !phone.isEmpty() ? phone : "Not provided",
            notes != null && !notes.isEmpty() 
                ? String.format("<div style=\"background: #fffbea; padding: 20px; border-radius: 5px; margin: 20px 0;\"><h3 style=\"margin-top: 0; color: #555;\">📝 Additional Notes</h3><p>%s</p></div>", notes)
                : "",
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );

        helper.setText(htmlContent, true);
        mailSender.send(message);
        System.out.println("📧 Studio email sent to info.nosaintz@gmail.com");
    }

    private void sendClientEmail(String clientName, String clientEmail, 
                                 String date, String time, String sessionType) 
            throws MessagingException {
        
        if (mailSender == null) {
            System.out.println("⚠️ Mail sender not configured - skipping client email");
            return;
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(clientEmail);
        helper.setSubject("✅ Booking Confirmation - NoSaintz Studio");

        String htmlContent = String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #808080; border-bottom: 2px solid #808080; padding-bottom: 10px;">
                        ✅ Booking Confirmation
                    </h2>
                    
                    <p>Hi <strong>%s</strong>,</p>
                    
                    <p>Thank you for booking a session with NoSaintz Studio! We've received your request and we're excited to work with you.</p>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #555;">📋 Your Booking Details</h3>
                        
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">📅 Date:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">⏰ Time:</td>
                                <td style="padding: 8px 0;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #666;">🎵 Session Type:</td>
                                <td style="padding: 8px 0; text-transform: capitalize;">%s</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4caf50;">
                        <h3 style="margin-top: 0; color: #2e7d32;">🎯 What's Next?</h3>
                        <ul style="padding-left: 20px;">
                            <li>We'll review your booking request</li>
                            <li>You'll receive a confirmation from us within 24 hours</li>
                            <li>We'll send you all the details you need to prepare for the session</li>
                        </ul>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                        <p style="margin: 0;"><strong>📧 Questions?</strong> Reply to this email or contact us at info.nosaintz@gmail.com</p>
                    </div>
                    
                    <p style="margin-top: 30px;">Looking forward to working with you!</p>
                    <p style="margin: 0;"><strong>NoSaintz Studio Team</strong></p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
                        <p>This is an automated confirmation email</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            clientName, date, time, sessionType
        );

        helper.setText(htmlContent, true);
        mailSender.send(message);
        System.out.println("📧 Confirmation email sent to " + clientEmail);
    }
}
