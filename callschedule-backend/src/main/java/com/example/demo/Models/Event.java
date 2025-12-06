package com.example.demo.Models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private List<String> images;  

    private String title;
    private String description;
    private String date;
    private String category;
    private List<String> details;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
