package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class CreateEventRequest {
    private String title;
    private String description;
    private List<String> images;
    private String date;
    private List<String> details;
}
