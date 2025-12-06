package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Models.Event;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    
}
