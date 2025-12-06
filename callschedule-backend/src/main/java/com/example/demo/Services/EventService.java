package com.example.demo.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.CreateEventRequest;


public interface EventService {
    ResponseEntity<ApiResponse> createEvent(CreateEventRequest req);
    ResponseEntity<?> getAllEvents();
    ResponseEntity<?> getEventById(String id);
    List<String> upload(MultipartFile[] files);
    ResponseEntity<ApiResponse> deleteEvent(String id);
    ResponseEntity<ApiResponse> updateEvent(String id, CreateEventRequest req);
}

