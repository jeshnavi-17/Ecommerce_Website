package com.beehyv.shoppingcart.services;

import com.beehyv.shoppingcart.entities.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    Order createOrder(int userId);

    List<Order> getOrderHistory(int userId);
}
