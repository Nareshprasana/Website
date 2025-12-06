package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendOtpRequest {
    @NotBlank
    private String mobile;

    // optional: pass userId if you already created user prior to OTP
    private String userId;
}
