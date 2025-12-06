package com.example.demo.Services.impl;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.Models.ContactMessage;
import com.example.demo.Repositories.ContactMessageRepository;
import com.example.demo.Services.ContactService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ContactMessageRequest;

import jakarta.mail.internet.MimeMessage;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ContactMessageRepository repo;

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // ------------------ SAVE + SEND MAIL ------------------
    @Override
    public void processForm(ContactMessageRequest dto) {
        repo.save(dtoToEntity(dto)); // save to DB

        try {
            sendMail(dto);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private ContactMessage dtoToEntity(ContactMessageRequest dto) {
        ContactMessage m = new ContactMessage();
        m.setName(dto.getName());
        m.setEmail(dto.getEmail());
        m.setSubject(dto.getSubject());
        m.setMessage(dto.getMessage());
        m.setStatus("pending");
        return m;
    }

    private void sendMail(ContactMessageRequest msg) throws Exception {
        Resource template = resourceLoader.getResource("classpath:templates/contact-thankyou.html");

        if (!template.exists()) {
            throw new RuntimeException("Email template missing");
        }

        String html = new String(template.getInputStream().readAllBytes())
                .replace("{{name}}", escapeHtml(msg.getName()));

        MimeMessage mime = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(msg.getEmail());
        helper.setSubject("Thank You for Contacting Us - Investza");
        helper.setText(html, true);

        mailSender.send(mime);
    }

    private String escapeHtml(String s) {
        return (s == null) ? "" : s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }

    // ------------------ DELETE ------------------
    @Override
    public ResponseEntity<ApiResponse> deleteMessage(String id) {

        Optional<ContactMessage> optionalContact = repo.findById(id);

        if (!optionalContact.isPresent()) {
            return ResponseEntity
                    .status(404)
                    .body(new ApiResponse(false, "Message not found"));
        }

        try {
            repo.deleteById(id);
            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse(true, "Contact deleted successfully!"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse(false, "Error: " + e.getMessage()));
        }
    }


    // ------------------ UPDATE (ADMIN) ------------------
    @Override
    public ResponseEntity<ApiResponse> updateMessage(String id, ContactMessageRequest dto) {

        ContactMessage msg = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (dto.getName() != null) msg.setName(dto.getName());
        if (dto.getEmail() != null) msg.setEmail(dto.getEmail());
        if (dto.getSubject() != null) msg.setSubject(dto.getSubject());
        if (dto.getMessage() != null) msg.setMessage(dto.getMessage());
        if (dto.getStatus() != null) msg.setStatus(dto.getStatus());

        try {
            repo.save(msg);

            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse(true, "Contact updated successfully!"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse(false, "Update failed: " + e.getMessage()));
        }
    }

    // ------------------ GET ALL ------------------
    @Override
    public ResponseEntity<?> getAllMessages() {
        try {
            return ResponseEntity.ok(repo.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
