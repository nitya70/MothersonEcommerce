package com.motherson.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.motherson.model.Order;
import com.motherson.repository.OrderRepository;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/place")
    public Order placeOrder(
            @RequestBody Order order){

        order.setStatus("PLACED");

        return orderRepository.save(order);
    }

    @GetMapping("/{email}")
    public List<Order> getOrders(
            @PathVariable String email){

        return orderRepository.findByUserEmail(email);
    }
}