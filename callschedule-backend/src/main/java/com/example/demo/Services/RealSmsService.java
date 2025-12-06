package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RealSmsService implements SmsService {

    @Value("${sms.enabled:true}")
    private boolean smsEnabled;

    @Value("${authkey.key}")      
    private String authKey;

    @Value("${authkey.sid}")      
    private String sid;

    private final RestTemplate restTemplate;

    public RealSmsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String sendSms(String mobile, String otp) {

        if (!smsEnabled) {
            System.out.println("[SMS_DISABLED] sms.enabled=false");
            return "SMS Disabled";
        }
        
        if (authKey == null || authKey.isBlank()) {
             System.out.println("[SMS_ERROR] Missing AuthKey");
             return "Missing AuthKey";
        }

        // Hardcoded placeholder to satisfy the {#date_time#} variable in your template
        final String DATE_PLACEHOLDER = "your scheduled call"; 

        try {
            // Use UriComponentsBuilder for proper URL encoding and to match template variables
            String url = UriComponentsBuilder.fromHttpUrl("https://api.authkey.io/request")
                    .queryParam("authkey", authKey)
                    .queryParam("mobile", mobile)
                    .queryParam("sid", sid)
                    .queryParam("country_code", "91")
                    .queryParam("date_time", DATE_PLACEHOLDER) // Satisfies {#date_time#}
                    .queryParam("otp", otp)
                    .toUriString();

            System.out.println("OTP URL => " + url);
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("OTP RESPONSE => " + response);
            return response;

        } catch (Exception e) {
            System.out.println("OTP FAILED => " + e.getMessage());
            return "FAILED: " + e.getMessage();
        }
    }
}