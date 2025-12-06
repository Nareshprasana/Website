package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Services.ContactService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ContactMessageRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // ---------- USER SEND MESSAGE ----------
    @PostMapping("/receive")
    public ResponseEntity<ApiResponse> receiveMessage(
            @Valid @RequestBody ContactMessageRequest request) {

        try {
            contactService.processForm(request);
            return ResponseEntity.ok(new ApiResponse(true, "Message saved & email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // ---------- ADMIN: GET ALL ----------
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return contactService.getAllMessages();
    }

    // ---------- ADMIN: DELETE ----------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable String id) {
        return contactService.deleteMessage(id);
    }


    // ---------- ADMIN: UPDATE ----------
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable String id,
            @RequestBody ContactMessageRequest dto) {

        return contactService.updateMessage(id, dto);
    }

}
