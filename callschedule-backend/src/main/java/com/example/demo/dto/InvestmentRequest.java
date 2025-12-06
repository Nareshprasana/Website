package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InvestmentRequest {
    @NotBlank
    private String userId;
    @NotBlank
    private String investmentRange;
}
