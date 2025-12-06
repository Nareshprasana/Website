package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.LoginService;
import com.example.demo.dto.AddUserRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest req) {
        return loginService.login(req);
    }

    @PostMapping("/adduser")
    public ResponseEntity<ApiResponse> createUser(@RequestBody AddUserRequest req){
        return loginService.addUser(req);
    }

    @GetMapping("/user/list")
    public ResponseEntity<?> getAllUser(){
        return loginService.getAllUsers();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable String id){
        return loginService.deleteUser(id);
    }
}
