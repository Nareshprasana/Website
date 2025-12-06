package com.example.demo.Services;

import org.springframework.http.ResponseEntity;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ContactMessageRequest;

public interface ContactService {
    void processForm(ContactMessageRequest dto);
    ResponseEntity<ApiResponse> deleteMessage(String id);
    ResponseEntity<ApiResponse> updateMessage(String id, ContactMessageRequest dto);
    ResponseEntity<?> getAllMessages();
}

