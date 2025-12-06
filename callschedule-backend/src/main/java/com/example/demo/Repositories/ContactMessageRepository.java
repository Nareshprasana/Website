package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Models.ContactMessage;

public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
}