package com.example.demo.Controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Models.UserTemp;
import com.example.demo.Services.UserFlowService;
import com.example.demo.dto.CreateBookingRequest;
import com.example.demo.dto.InvestmentRequest;
import com.example.demo.dto.SendOtpRequest;
import com.example.demo.dto.StartRequest;
import com.example.demo.dto.VerifyOtpRequest;

@RestController
@RequestMapping("/api/flow")
@CrossOrigin(origins = "*")
public class UserFlowController {

    private final UserFlowService userFlowService;

    @Autowired
    public UserFlowController(UserFlowService userFlowService) {
        this.userFlowService = userFlowService;
    }

    // STEP 1
    @PostMapping("/start")
    public ResponseEntity<?> start(@RequestBody StartRequest req) {
        UserTemp u = userFlowService.start(req);
        return ResponseEntity.ok(Map.of("userId", u.getId()));
    }

    // STEP 2
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req) {
        UserTemp u = userFlowService.sendOtp(req);
        return ResponseEntity.ok(Map.of(
                "userId", u.getId(),
                "mobile", u.getMobile(),
                "message", "OTP request submitted - check SMS"));
    }

    // STEP 2b
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest req) {
        // Service handles ALL verification logic (OTP match, expiry, user existence)
        boolean ok = userFlowService.verifyOtp(req);

        if (ok) {
            // Success: OTP matched and was not expired.
            return ResponseEntity.ok(Map.of("verified", true));
        }

        // Failure: If the service returns false, the OTP was invalid, expired, or the user was not found.
        return ResponseEntity.ok(Map.of(
            "verified", false,
            "expired", false, 
            "message", "Invalid OTP or OTP expired. Please request a new one."
        ));
    }

    // STEP 3
    @PostMapping("/investment")
    public ResponseEntity<?> investment(@RequestBody InvestmentRequest req) {
        boolean eligible = userFlowService.setInvestment(req);
        return ResponseEntity.ok(Map.of("eligible", eligible));
    }

    // STEP 4
    @GetMapping("/check-slot")
    public ResponseEntity<?> checkSlot(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        return ResponseEntity.ok(userFlowService.checkSlot(date, time));
    }

    // STEP 5
    @PostMapping("/create-booking")
    public ResponseEntity<?> createBooking(@RequestBody CreateBookingRequest req) {
        return ResponseEntity.ok(userFlowService.createBooking(req));
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(userFlowService.getAllBookings());
    }

    @PostMapping("/booking/status/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        boolean updated = userFlowService.updateBookingStatus(id, status);
        return ResponseEntity.ok(Map.of("updated", updated));
    }

    @DeleteMapping("/booking/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable String id) {
        boolean deleted = userFlowService.deleteBooking(id);
        return ResponseEntity.ok(Map.of("deleted", deleted));
    }
}