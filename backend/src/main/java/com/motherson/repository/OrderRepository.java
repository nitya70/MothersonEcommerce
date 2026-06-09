package com.motherson.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.motherson.model.Order;

public interface OrderRepository
        extends MongoRepository<Order,String>{

    List<Order> findByUserEmail(
            String userEmail
    );

    long countByUserEmail(
            String userEmail
    );
}
