package com.beehyv.shoppingcart.controllers;


import com.beehyv.shoppingcart.entities.Order;
import com.beehyv.shoppingcart.services.OrderService;
import com.beehyv.shoppingcart.services.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/{userId}/createOrder")
    public ResponseEntity<Order> createOrder(@PathVariable int userId) {
        Order order = orderService.createOrder(userId);
        return ResponseEntity.ok(order);
    }
    @GetMapping("/{userId}/getOrders")
    public ResponseEntity<List<Order>> getOrders(@PathVariable int userId) {
        List<Order> orders = orderService.getOrderHistory(userId);
        return ResponseEntity.ok(orders);
    }
}

