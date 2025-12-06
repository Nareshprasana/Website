package com.example.demo.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Models.ReviewPortfolio;

@Repository
public interface ReviewPortfolioRepository extends MongoRepository<ReviewPortfolio, String> {
    
    // Count by status
    long countByStatus(String status);
}