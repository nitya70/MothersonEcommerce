package com.motherson.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public String addCart(
        @RequestBody CartItem item){

    List<CartItem> items =
            cartRepository
            .findAllByUserEmail(
                    item.getUserEmail()
            );

    for(CartItem existing : items){

        if(existing.getProductId()
                .equals(
                item.getProductId())){

            return "Already Exists";
        }
    }

    cartRepository.save(item);

    return "Added";
}

    @GetMapping("/{email}")
    public List<CartItem> getCartItems(
            @PathVariable String email){

        return cartRepository
                .findAllByUserEmail(email);
    }

    @GetMapping("/count/{email}")
    public long getCartCount(
            @PathVariable String email){

        return cartRepository
                .countByUserEmail(email);
    }
    
    @PutMapping("/increase/{productId}")

public String increaseQuantity(
        @PathVariable String productId){

    List<CartItem> items =
            cartRepository.findAll();

    for(CartItem item : items){

        if(item.getProductId()
                .equals(productId)){

            item.setQuantity(
                    item.getQuantity()+1
            );

            cartRepository.save(item);

            return "Updated";
        }
    }

    return "Not Found";
}
    @PutMapping("/decrease/{productId}")

public String decreaseQuantity(
        @PathVariable String productId){

    List<CartItem> items =
            cartRepository.findAll();

    for(CartItem item : items){

        if(item.getProductId()
                .equals(productId)){

            if(item.getQuantity() > 1){

                item.setQuantity(
                        item.getQuantity()-1
                );

                cartRepository.save(item);
            }

            return "Updated";
        }
    }

    return "Not Found";
}
    @DeleteMapping("/remove/{productId}")
    public String removeCartItem(
            @PathVariable String productId){

        cartRepository
                .deleteByProductId(
                        productId
                );

        return "Removed";
    }
}