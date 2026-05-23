// ProductRepository.java
package com.motherson.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.motherson.model.Product;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findByProductid(int productid);
}