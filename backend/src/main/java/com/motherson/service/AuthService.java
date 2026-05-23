package com.motherson.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.motherson.dto.ApiResponse;
import com.motherson.dto.RegisterRequest;
import com.motherson.model.User;
import com.motherson.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public ApiResponse register(RegisterRequest request) {

        Optional<User> existingUser =
                userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            return new ApiResponse(
                    false,
                    "Email already exists. Please login."
            );
        }

        User user = new User();

        user.setUserId("USR-" + UUID.randomUUID().toString());

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        userRepository.save(user);

        return new ApiResponse(
                true,
                "Registered successfully"
        );
    }
}