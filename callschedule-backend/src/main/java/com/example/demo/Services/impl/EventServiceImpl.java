package com.example.demo.Services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.Models.Event;
import com.example.demo.Repositories.EventRepository;
import com.example.demo.Services.EventService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.CreateEventRequest;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private Cloudinary cloudinary;

    // ---------------------------
    // Create Event
    // ---------------------------
    @Override
    public ResponseEntity<ApiResponse> createEvent(CreateEventRequest req) {
        try {
            LocalDate eventDate;

            try {
                eventDate = LocalDate.parse(req.getDate());
            } catch (DateTimeParseException e) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Invalid date format. Use yyyy-MM-dd"));
            }

            String category = eventDate.isBefore(LocalDate.now()) ? "past" : "upcoming";

            Event event = Event.builder()
                    .images(req.getImages())
                    .date(req.getDate())
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .category(category)
                    .details(req.getDetails())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            eventRepository.save(event);

            return ResponseEntity.status(201)
                    .body(new ApiResponse(true, "Event created successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }


    // ---------------------------
    // Get all events
    // ---------------------------
    @Override
    public ResponseEntity<?> getAllEvents() {
        try {
            return ResponseEntity.ok(eventRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ---------------------------
    // Get event by ID
    // ---------------------------
    @Override
    public ResponseEntity<?> getEventById(String id) {
        try {
            Optional<Event> optionalEvent = eventRepository.findById(id);
            if (optionalEvent.isPresent()) {
                return ResponseEntity.ok(optionalEvent.get());
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("message", "Event not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ---------------------------
    // Upload images to Cloudinary
    // ---------------------------
    @Override
    public List<String> upload(MultipartFile[] files) {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.emptyMap()
                );

                urls.add(uploadResult.get("secure_url").toString());

            } catch (Exception e) {
                throw new RuntimeException("Image upload failed: " + e.getMessage());
            }
        }

        return urls;
    }

    // ---------------------------
    // Delete event
    // ---------------------------
    @Override
    public ResponseEntity<ApiResponse> deleteEvent(String id) {

        Optional<Event> optionalEvent = eventRepository.findById(id);

        if (optionalEvent.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new ApiResponse(false, "Event not found"));
        }

        try {
            eventRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Event deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }


    // ---------------------------
    // Update event
    // ---------------------------
    @Override
    public ResponseEntity<ApiResponse> updateEvent(String id, CreateEventRequest req) {

        Optional<Event> optionalEvent = eventRepository.findById(id);

        if (!optionalEvent.isPresent()) {
            return ResponseEntity.status(404)
                .body(new ApiResponse(false, "Event not found"));
        }

        Event event = optionalEvent.get();

        try {
            LocalDate eventDate = LocalDate.parse(req.getDate());

            event.setTitle(req.getTitle());
            event.setDescription(req.getDescription());
            event.setDate(eventDate.toString());
            event.setImages(req.getImages());
            event.setDetails(req.getDetails());

            event.setUpdatedAt(LocalDateTime.now());

            if (eventDate.isBefore(LocalDate.now())) {
                event.setCategory("past");
            } else {
                event.setCategory("upcoming");
            }

            eventRepository.save(event);
            return ResponseEntity.status(200).body(new ApiResponse(true, "Event updated successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, e.getMessage()));
        }
    }
}
