package com.motherson.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.motherson.model.WishlistItem;

public interface WishlistRepository
        extends MongoRepository<WishlistItem, String>{

    long countByUserEmail(
            String userEmail);

    List<WishlistItem>
        findByUserEmail(
            String userEmail);

    Optional<WishlistItem>
        findByUserEmailAndProductId(
            String userEmail,
            String productId
        );
}