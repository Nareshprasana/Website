package com.example.demo.Services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Models.Booking;
import com.example.demo.Models.UserTemp;
import com.example.demo.Repositories.BookingRepository;
import com.example.demo.Repositories.UserTempRepository;
import com.example.demo.dto.CheckSlotResponse;
import com.example.demo.dto.CreateBookingRequest;
import com.example.demo.dto.InvestmentRequest;
import com.example.demo.dto.SendOtpRequest;
import com.example.demo.dto.StartRequest;
import com.example.demo.dto.VerifyOtpRequest;
import com.example.demo.util.OtpUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserFlowService {

    private final UserTempRepository userTempRepository;
    private final BookingRepository bookingRepository;
    private final SmsService smsService;

    @Autowired
    public UserFlowService(
            UserTempRepository userTempRepository,
            BookingRepository bookingRepository,
            SmsService smsService) {

        this.userTempRepository = userTempRepository;
        this.bookingRepository = bookingRepository;
        this.smsService = smsService;
    }

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${investza.admin.email}")
    private String getNotificationMail;
    

    // STEP 1
    public UserTemp start(StartRequest req) {
        UserTemp u = UserTemp.builder()
                .fullName(req.getFullName())
                .otpVerified(false)
                .createdAt(LocalDateTime.now())
                .build();

        return userTempRepository.save(u);
    }

    // STEP 2
    @Transactional
    public UserTemp sendOtp(SendOtpRequest req) {

        UserTemp u = null;

        if (req.getUserId() != null && !req.getUserId().isBlank()) {
            u = userTempRepository.findById(req.getUserId()).orElse(null);
        }

        if (u == null && req.getMobile() != null && !req.getMobile().isBlank()) {
            u = userTempRepository.findByMobile(req.getMobile()).orElse(null);
        }

        if (u == null) {
            u = UserTemp.builder()
                    .mobile(req.getMobile())
                    .otpVerified(false)
                    .createdAt(LocalDateTime.now())
                    .build();
        }

        u.setMobile(req.getMobile());
        String otp = OtpUtil.generate4DigitOtp();

        u.setOtp(otp);
        u.setOtpVerified(false);
        u.setOtpGeneratedAt(LocalDateTime.now());
        userTempRepository.save(u);

        // Call the service with only mobile and otp
        smsService.sendSms(u.getMobile(), otp);

        return u;
    }

    // STEP 2b
    @Transactional
    public boolean verifyOtp(VerifyOtpRequest req) {
        // Fix: Prevent IllegalArgumentException if userId is null/empty
        if (req.getUserId() == null || req.getUserId().isBlank()) {
            return false;
        }

        Optional<UserTemp> optional = userTempRepository.findById(req.getUserId());
        if (optional.isEmpty()) {
            return false;
        }

        UserTemp u = optional.get();

        if (u.getOtp() == null) {
            return false;
        }

        if (u.getOtpGeneratedAt() != null
                && u.getOtpGeneratedAt().plusMinutes(3).isBefore(LocalDateTime.now())) {
            return false; // OTP Expired
        }

        // Fix: Use trim() on the incoming OTP to prevent failures due to whitespace
        if (u.getOtp().equals(req.getOtp().trim())) {
            u.setOtpVerified(true);
            userTempRepository.save(u);
            return true; // OTP Matched
        }

        return false; // OTP Invalid
    }

    // STEP 3
    @Transactional
    public boolean setInvestment(InvestmentRequest req) {
        UserTemp u = userTempRepository.findById(req.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        u.setInvestmentRange(req.getInvestmentRange());
        userTempRepository.save(u);

        return !"BELOW_50L".equalsIgnoreCase(req.getInvestmentRange());
    }

    // STEP 4
    public CheckSlotResponse checkSlot(LocalDate date, LocalTime time) {
        long count = bookingRepository.countByDateAndTime(date, time);
        return new CheckSlotResponse(count < 5, count);
    }

    // STEP 5
    @Transactional
    public Booking createBooking(CreateBookingRequest req) {

        UserTemp u = userTempRepository.findById(req.getUserId())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if (!u.isOtpVerified()) {
            throw new IllegalStateException("OTP not verified");
        }

        if ("BELOW_50L".equalsIgnoreCase(u.getInvestmentRange())) {
            throw new IllegalStateException("User not eligible");
        }

        long count = bookingRepository.countByDateAndTime(req.getDate(), req.getTime());
        if (count >= 5) {
            throw new IllegalStateException("Slot full");
        }

        Booking b = Booking.builder()
                .fullName(u.getFullName())
                .mobile(u.getMobile())
                .email(req.getEmail())
                .guestEmail(req.getGuestEmail())
                .message(req.getMessage())
                .investmentRange(u.getInvestmentRange())
                .date(req.getDate())
                .time(req.getTime())
                .status("Pending")
                .createdAt(LocalDateTime.now())
                .build();

        
        Booking newBooking = bookingRepository.save(b);
        try {
            sendCallScheduleConfirmation(newBooking);
            notifyAdminCallSchedule(newBooking);
        } catch (MessagingException | IOException e) {
            // Log the error but don't fail the booking
            System.err.println("Failed to send email notifications: " + e.getMessage());
            e.printStackTrace();
            // Booking is still created successfully even if emails fail
        }
        return newBooking;
    }

    // Fix: Add safety check to prevent IllegalArgumentException when ID is null
    public UserTemp getUser(String id) {
        if (id == null || id.isBlank()) {
            return null;
        }
        return userTempRepository.findById(id).orElse(null);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public boolean updateBookingStatus(String id, String status) {
        Booking b = bookingRepository.findById(id).orElse(null);
        if (b != null) {
            b.setStatus(status);
            bookingRepository.save(b);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteBooking(String id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // send call scheduled confirmation mail
    private void sendCallScheduleConfirmation(Booking booking) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/call-schedule-user-email.html");

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(booking.getFullName()))
                .replace("{{date}}", booking.getDate().toString())
                .replace("{{time}}", booking.getTime().toString())
                .replace("{{mobile}}", escapeHtml(booking.getMobile()));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(booking.getEmail());
        helper.setSubject("Call Scheduled - Investza Portfolio Review");
        helper.setText(html, true);

        mailSender.send(message);
    }

    // Send notification to admin/sender
    private void notifyAdminCallSchedule(Booking booking) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/call-schedule-admin-notification.html");

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(booking.getFullName()))
                .replace("{{mobile}}", escapeHtml(booking.getMobile()))
                .replace("{{email}}", escapeHtml(booking.getEmail()))
                .replace("{{investmentRange}}", escapeHtml(booking.getInvestmentRange()))
                .replace("{{date}}", booking.getDate().toString())
                .replace("{{time}}", booking.getTime().toString())
                .replace("{{createdAt}}", booking.getCreatedAt().toString());

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(getNotificationMail); 
        helper.setSubject("New Call Scheduled - Investza");
        helper.setText(html, true);

        mailSender.send(message);
    }

    private String escapeHtml(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }
}
