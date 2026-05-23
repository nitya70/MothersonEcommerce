package com.motherson.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;

    private CustomerDetails customerDetails;

    private List<OrderItem> products;

    private double totalAmount;

    private String paymentMethod;

    private String paymentStatus;

    private String orderStatus;

    private LocalDateTime orderedAt;

    public Order() {
    }

    public Order(String userId,
                 CustomerDetails customerDetails,
                 List<OrderItem> products,
                 double totalAmount,
                 String paymentMethod,
                 String paymentStatus,
                 String orderStatus,
                 LocalDateTime orderedAt) {

        this.userId = userId;
        this.customerDetails = customerDetails;
        this.products = products;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.orderedAt = orderedAt;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public CustomerDetails getCustomerDetails() {
        return customerDetails;
    }

    public List<OrderItem> getProducts() {
        return products;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public LocalDateTime getOrderedAt() {
        return orderedAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setCustomerDetails(CustomerDetails customerDetails) {
        this.customerDetails = customerDetails;
    }

    public void setProducts(List<OrderItem> products) {
        this.products = products;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public void setOrderedAt(LocalDateTime orderedAt) {
        this.orderedAt = orderedAt;
    }
}
