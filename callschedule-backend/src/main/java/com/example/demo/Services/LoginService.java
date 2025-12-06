package com.example.demo.Services;

import org.springframework.http.ResponseEntity;

import com.example.demo.dto.AddUserRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.LoginRequest;



public interface LoginService {
    ResponseEntity<ApiResponse> login(LoginRequest req);
    ResponseEntity<ApiResponse> addUser(AddUserRequest req);
    ResponseEntity<ApiResponse> deleteUser(String id);
    ResponseEntity<?> getAllUsers(); 
}
