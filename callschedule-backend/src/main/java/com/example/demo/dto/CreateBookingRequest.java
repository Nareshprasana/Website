package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class CreateBookingRequest {
    private String userId;
    private String email;
    private String guestEmail;
    private String message;
    private LocalDate date;
    private LocalTime time;
}
