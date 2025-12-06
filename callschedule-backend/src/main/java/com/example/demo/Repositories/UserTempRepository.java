package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Models.UserTemp;

public interface UserTempRepository extends MongoRepository<UserTemp, String> {
    Optional<UserTemp> findByMobile(String mobile);
}
