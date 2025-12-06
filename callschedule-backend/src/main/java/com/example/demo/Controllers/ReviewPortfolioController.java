package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.Services.ReviewPortfolioService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ReviewPortfolioRequest;
import com.example.demo.dto.ReviewPortfolioRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review_portfolio")
@CrossOrigin(origins = "*")
public class ReviewPortfolioController {
    
    @Autowired
    private ReviewPortfolioService service;
    
    // Public endpoint - Submit review portfolio request
    @PostMapping("/submit")
    public ResponseEntity<ApiResponse> submitForm(@Valid @RequestBody ReviewPortfolioRequest request) {
        try {
            service.saveForm(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Form submitted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to submit form: " + e.getMessage()));
        }
    }
    
    // Get all review portfolio requests
    @GetMapping("/list")
    public ResponseEntity<?> getAllReviewPortfolios() {
        try {
            List<ReviewPortfolio> data = service.getAll();

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(data);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    
    // Get single review portfolio request by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable String id) {
        try {
            ReviewPortfolio request = service.getRequestById(id);
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to fetch request: " + e.getMessage()));
        }
    }
    
    // Update review portfolio request
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateRequest(
            @PathVariable String id,
            @Valid @RequestBody ReviewPortfolioRequest request) {
        try {
            service.updateRequest(id, request);
            return ResponseEntity.ok(new ApiResponse(true, "Request updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update request: " + e.getMessage()));
        }
    }
    
    // Update only status
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {
        try {
            if (!status.equals("PENDING") && !status.equals("DONE")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "Status must be either PENDING or DONE"));
            }
            
            service.updateStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(true, "Status updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update status: " + e.getMessage()));
        }
    }
    
    // Delete review portfolio request
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRequest(@PathVariable String id) {
        try {
            service.deleteRequest(id);
            return ResponseEntity.ok(new ApiResponse(true, "Request deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete request: " + e.getMessage()));
        }
    }
    
    // Get count by status
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        try {
            return ResponseEntity.ok(service.getStats());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to fetch stats: " + e.getMessage()));
        }
    }
}