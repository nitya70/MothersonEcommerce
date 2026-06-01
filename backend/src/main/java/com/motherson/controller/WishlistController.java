package com.motherson.controller;

import java.util.List;

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

    @PostMapping("/toggle")
    public String toggleWishlist(
            @RequestBody WishlistItem item){

        WishlistItem existing =
                wishlistRepository
                .findByUserEmailAndProductId(
                        item.getUserEmail(),
                        item.getProductId()
                );

        if(existing != null){

            wishlistRepository.delete(
                    existing
            );

            return "Removed";
        }

        wishlistRepository.save(item);

        return "Added";
    }

    @GetMapping("/count/{email}")
    public long getWishlistCount(
            @PathVariable String email){

        return wishlistRepository
                .countByUserEmail(email);
    }

    @GetMapping("/{email}")
    public List<WishlistItem> getWishlistItems(
            @PathVariable String email){

        return wishlistRepository
                .findByUserEmail(email);
    }
}