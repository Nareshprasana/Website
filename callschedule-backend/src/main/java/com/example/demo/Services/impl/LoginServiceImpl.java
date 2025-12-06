package com.example.demo.Services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Services.LoginService;
import com.example.demo.dto.AddUserRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.LoginRequest;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<ApiResponse> addUser(AddUserRequest req) {

        // Check if user already exists by username or email
        Optional<User> existing = userRepo.findByUsernameOrEmail(req.getUsername(), req.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "User already exists with this username/email"));
        }

        // Create new user
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword())); // Encrypt password

        try{
            userRepo.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "User created successfully"));
        }catch(Exception e){
            return ResponseEntity.status(500).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> login(LoginRequest req) {

        // Find user by username OR email
        Optional<User> optionalUser = userRepo.findByUsernameOrEmail(req.getUsername(), req.getUsername());

        if (!optionalUser.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid username/email or password"));
        }

        User user = optionalUser.get();

        // Check password
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid username/email or password"));
        }

        // Login success
        return ResponseEntity.ok(new ApiResponse(true, "Login successful!"));
    }

    @Override
    public ResponseEntity<ApiResponse> deleteUser(String id) {

        Optional<User> existing = userRepo.findById(id);
        if (!existing.isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "User not found"));
        }

        userRepo.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
    }

    @Override
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }
}
