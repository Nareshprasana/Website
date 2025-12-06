package com.example.demo.Models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "booking")
public class Booking {
    @Id
    private String id;

    private String fullName;
    private String mobile;
    private String email;
    private String guestEmail;
    private String message;
    private String investmentRange;
    private String status;

    private LocalDate date;
    private LocalTime time;

    private LocalDateTime createdAt;
}
