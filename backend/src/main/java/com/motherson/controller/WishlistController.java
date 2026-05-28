package com.motherson.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.motherson.model.WishlistItem;
import com.motherson.repository.WishlistRepository;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin("*")

public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @PostMapping("/add")

    public WishlistItem addWishlist(

            @RequestBody WishlistItem item){

        return wishlistRepository.save(item);
    }

    @GetMapping("/count/{email}")

    public long getWishlistCount(
            @PathVariable String email){

        return wishlistRepository
                .countByUserEmail(email);
    }
}