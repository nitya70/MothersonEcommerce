package com.motherson.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.motherson.model.User;
import com.motherson.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /* ================= REGISTER ================= */

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user){

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if(existingUser.isPresent()){

            Map<String,Object> response =
                    new HashMap<>();

            response.put("success", false);
            response.put("message",
                    "Email Already Exists");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        userRepository.save(user);

        Map<String,Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put("message",
                "Registration Successful");

        return ResponseEntity.ok(response);
    }

    /* ================= LOGIN ================= */

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User loginUser){

        Optional<User> userOptional =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if(userOptional.isEmpty()){

            Map<String,Object> response =
                    new HashMap<>();

            response.put("success", false);
            response.put("message",
                    "User Not Found");

            return ResponseEntity
                    .status(401)
                    .body(response);
        }

        User existingUser =
                userOptional.get();

        boolean passwordMatched =

                passwordEncoder.matches(
                        loginUser.getPassword(),
                        existingUser.getPassword()
                );

        if(!passwordMatched){

            Map<String,Object> response =
                    new HashMap<>();

            response.put("success", false);
            response.put("message",
                    "Wrong Password");

            return ResponseEntity
                    .status(401)
                    .body(response);
        }

        Map<String,Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put("message",
                "Login Successful");

        response.put("user",
                existingUser);

        return ResponseEntity.ok(response);
    }

    /* ================= UPDATE PROFILE ================= */

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(
            @RequestBody User updatedUser){

        Optional<User> optionalUser =
                userRepository.findById(
                        updatedUser.getId()
                );

        if(optionalUser.isEmpty()){

            Map<String,Object> response =
                    new HashMap<>();

            response.put("success", false);
            response.put("message",
                    "User Not Found");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        User existingUser =
                optionalUser.get();

        existingUser.setPhone(
                updatedUser.getPhone()
        );

        existingUser.setAddress(
                updatedUser.getAddress()
        );

        User savedUser =
                userRepository.save(
                        existingUser
                );

        Map<String,Object> response =
                new HashMap<>();

        response.put("success", true);
        response.put("message",
                "Profile Updated Successfully");

        response.put("user",
                savedUser);

        return ResponseEntity.ok(response);
    }
}