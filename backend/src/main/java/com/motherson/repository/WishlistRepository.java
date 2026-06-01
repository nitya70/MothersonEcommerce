package com.motherson.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.motherson.model.WishlistItem;

@Repository
public interface WishlistRepository
extends MongoRepository<WishlistItem,String>{

    WishlistItem findByUserEmailAndProductId(
            String userEmail,
            String productId
    );

    List<WishlistItem> findByUserEmail(
            String userEmail
    );

    long countByUserEmail(
            String userEmail
    );
}