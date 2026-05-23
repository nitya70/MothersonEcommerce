// ProductController.java
package com.motherson.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.motherson.model.Product;
import com.motherson.repository.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    @GetMapping("/{productid}")
    public ResponseEntity<Product> getProductById(@PathVariable int productid) {
        return repo.findByProductid(productid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}