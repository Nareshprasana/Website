package com.example.demo.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TextController {

    @GetMapping("/")
    public String getText() {
        return "Backend is working fine!";
    }
}