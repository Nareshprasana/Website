package com.example.demo.Models;

import java.time.LocalDateTime;

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
@Document(collection = "portfolio_review_request")
public class ReviewPortfolio {

    @Id
    private String id;

    private String fullName;
    private String contactNumber;
    private String investmentValue;
    private String email;
    private boolean agreeToPolicy;
    
    @Builder.Default
    private String status = "PENDING"; // PENDING or DONE
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt;

    // Custom constructor without id (for creating new instances)
    public ReviewPortfolio(String fullName, String contactNumber, String investmentValue, 
                          String email, boolean agreeToPolicy) {
        this.fullName = fullName;
        this.contactNumber = contactNumber;
        this.investmentValue = investmentValue;
        this.email = email;
        this.agreeToPolicy = agreeToPolicy;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }
}