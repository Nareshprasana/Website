package com.example.demo.Repositories;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Models.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
    long countByDateAndTime(LocalDate date, LocalTime time);
}
