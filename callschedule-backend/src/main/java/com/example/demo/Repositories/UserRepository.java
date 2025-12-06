package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsernameOrEmail(String username, String email);
}
