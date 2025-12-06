package com.example.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user_table")
public class User {

    @Id
    private String id;

    private String username;
    private String email;
    private String password;
}
