package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;

import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepo;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user exists
        Optional<User> admin = userRepo.findByUsernameOrEmail("admin", "admin@investza.in");

        if (admin.isEmpty()) {
            User user = new User();
            user.setUsername("admin");
            user.setEmail("admin@investza.in");
            // Encrypt password
            user.setPassword(new BCryptPasswordEncoder().encode("admin123")); 
            
            try {
                userRepo.save(user);
                System.out.println("=========================================");
                System.out.println("ADMIN USER CREATED SUCCESSFULLY");
                System.out.println("Username: admin");
                System.out.println("Password: admin123");
                System.out.println("=========================================");
            } catch (Exception e) {
                System.err.println("Failed to seed admin user: " + e.getMessage());
            }
        } else {
            System.out.println("Admin user already exists.");
        }
    }
}
