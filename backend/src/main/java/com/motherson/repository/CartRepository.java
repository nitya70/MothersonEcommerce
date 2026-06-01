package com.motherson.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.motherson.model.CartItem;

public interface CartRepository
extends MongoRepository<CartItem,String>{

    List<CartItem> findAllByUserEmail(
            String userEmail
    );

    long countByUserEmail(
            String userEmail
    );

    void deleteByProductId(
            String productId
            
    );
        void deleteByUserEmail(
                String userEmail
        );
}