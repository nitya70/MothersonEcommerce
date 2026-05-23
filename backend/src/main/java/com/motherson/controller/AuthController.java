package com.motherson.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.motherson.config.SecurityConfig;
import com.motherson.dto.ApiResponse;
import com.motherson.dto.RegisterRequest;
import com.motherson.dto.LoginRequest;
import com.motherson.model.User;
import com.motherson.repository.UserRepository;
import com.motherson.service.AuthService;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ApiResponse register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @RequestBody LoginRequest request
    ) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body(new ApiResponse(
                            false,
                            "Invalid email or password"
                    ));
        }
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body(new ApiResponse(
                            false,
                            "Invalid email or password"
                    )); 
                }
        return ResponseEntity.ok(new ApiResponse(
                true,
                "Login successful"
        ));
    }
}