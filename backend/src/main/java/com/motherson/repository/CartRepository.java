package com.motherson.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.motherson.model.CartItem;

public interface CartRepository
       extends MongoRepository<CartItem, String> {

    Optional<CartItem> findByUserEmail(String userEmail);
    long countByUserEmail(String userEmail);
}