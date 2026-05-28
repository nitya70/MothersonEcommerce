package com.motherson.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.motherson.model.User;
import org.springframework.web.bind.annotation.PutMapping;
import com.motherson.repository.UserRepository;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /* REGISTER */

    @PostMapping("/register")

    public ResponseEntity<?> registerUser(
            @RequestBody User user){

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if(existingUser.isPresent()){

            return ResponseEntity
                    .badRequest()
                    .body("Email Already Exists");
        }

        /* ENCODE PASSWORD */

        user.setPassword(

                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        User savedUser =
                userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    /* LOGIN */

    @PostMapping("/login")

    public ResponseEntity<?> loginUser(
            @RequestBody User loginUser){

        Optional<User> userOptional =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if(userOptional.isEmpty()){

            return ResponseEntity
                    .status(401)
                    .body("User Not Found");
        }

        User existingUser =
                userOptional.get();

        boolean passwordMatched =

                passwordEncoder.matches(
                        loginUser.getPassword(),
                        existingUser.getPassword()
                );

        if(!passwordMatched){

            return ResponseEntity
                    .status(401)
                    .body("Wrong Password");
        }

        /* RETURN USER DETAILS */

       
        return ResponseEntity.ok(existingUser);
    }
    //update details
    @PutMapping("/update")

public ResponseEntity<?> updateUser(
        @RequestBody User updatedUser){

    Optional<User> optionalUser =
            userRepository.findById(
                    updatedUser.getId()
            );

    if(optionalUser.isEmpty()){

        return ResponseEntity
                .badRequest()
                .body("User Not Found");
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

    return ResponseEntity.ok(savedUser);
}
}