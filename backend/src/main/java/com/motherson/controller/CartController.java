package com.motherson.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.motherson.model.CartItem;
import com.motherson.repository.CartRepository;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestBody CartItem cartItem) {

        cartRepository.save(cartItem);

        return ResponseEntity.ok("Added To Cart");
    }
    @GetMapping("/count/{email}")

public long getCartCount(

        @PathVariable String email){

    return cartRepository
            .countByUserEmail(email);
}
}