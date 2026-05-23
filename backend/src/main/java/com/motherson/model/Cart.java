package com.motherson.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "cart")
public class Cart {

    @Id
    private String id;

    private String userId;

    private List<CartItem> products;

    private double totalPrice;

    private LocalDateTime createdAt;

    public Cart() {
    }

    public Cart(String userId, List<CartItem> products,
                double totalPrice, LocalDateTime createdAt) {

        this.userId = userId;
        this.products = products;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public List<CartItem> getProducts() {
        return products;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setProducts(List<CartItem> products) {
        this.products = products;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}