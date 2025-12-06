package com.example.demo.Services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.Repositories.ReviewPortfolioRepository;
import com.example.demo.dto.ReviewPortfolioRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ReviewPortfolioService {

    @Autowired
    private ReviewPortfolioRepository repository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${investza.admin.email}")
    private String getNotificationMail;

    // Public method - Save form submission
    public void saveForm(ReviewPortfolioRequest request) {
        ReviewPortfolio form = new ReviewPortfolio(
                request.getFullName(),
                request.getContactNumber(),
                request.getInvestmentValue(),
                request.getEmail(),
                request.isAgreeToPolicy()
        );
        repository.save(form);

        try {
            sendMail(request);
            notifySender(request);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    
    // Get all requests with optional status filter
    public List<ReviewPortfolio> getAll() {
        return repository.findAll();
    }

    
    // Get request by ID
    public ReviewPortfolio getRequestById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review portfolio request not found with id: " + id));
    }
    
    // Update request
    public ReviewPortfolio updateRequest(String id, ReviewPortfolioRequest request) {
        ReviewPortfolio existing = getRequestById(id);
        
        existing.setFullName(request.getFullName());
        existing.setContactNumber(request.getContactNumber());
        existing.setInvestmentValue(request.getInvestmentValue());
        existing.setEmail(request.getEmail());
        existing.setStatus(request.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());
        
        return repository.save(existing);
    }
    
    // Update only status
    public ReviewPortfolio updateStatus(String id, String status) {
        ReviewPortfolio existing = getRequestById(id);
        existing.setStatus(status);
        existing.setUpdatedAt(LocalDateTime.now());
        return repository.save(existing);
    }
    
    // Delete request
    public void deleteRequest(String id) {
        ReviewPortfolio existing = getRequestById(id);
        repository.delete(existing);
    }
    
    // Get statistics
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", repository.count());
        stats.put("pending", repository.countByStatus("PENDING"));
        stats.put("done", repository.countByStatus("DONE"));
        return stats;
    }

    // Email methods (unchanged)
    
    private void sendMail(ReviewPortfolioRequest request) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-thankyou.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-thankyou.html");
        }

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentValue()));

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(request.getEmail());
        helper.setSubject("Thank You for Your Portfolio Review Request - Investza");
        helper.setText(html, true);

        mailSender.send(mimeMessage);

        System.out.println("Email sent successfully to: " + request.getEmail());
    }

    private String escapeHtml(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }

    private void notifySender(ReviewPortfolioRequest request) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-notification.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-notification.html");
        }

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentValue()));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(getNotificationMail);
        helper.setSubject("New Portfolio Review Request - Investza");
        helper.setText(html, true);

        mailSender.send(message);

        System.out.println("Notification email sent successfully");
    }
}