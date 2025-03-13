package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.services.UserService;
import com.example.backend.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    @Autowired
    public AdminController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addUser(@Valid @RequestBody User user) {
        logger.info("Rozpoczynam proces dodawania użytkownika: {}", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (userService.existsByUsername(user.getUsername())) {
            logger.warn("Użytkownik o nazwie {} już istnieje", user.getUsername());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Użytkownik o podanej nazwie już istnieje.");
        }

        try {
            User savedUser = userService.saveUser(user);
            logger.info("Użytkownik {} został pomyślnie utworzony", user.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            logger.error("Błąd podczas dodawania użytkownika: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Wystąpił błąd podczas tworzenia użytkownika. Spróbuj ponownie później.");
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        logger.error("Wystąpił nieoczekiwany błąd: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Wystąpił błąd: " + e.getMessage());
    }
}
