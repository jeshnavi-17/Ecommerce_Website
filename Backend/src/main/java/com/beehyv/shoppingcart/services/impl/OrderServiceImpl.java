package com.beehyv.shoppingcart.services.impl;

import com.beehyv.shoppingcart.entities.CartItem;
import com.beehyv.shoppingcart.entities.Order;
import com.beehyv.shoppingcart.entities.OrderItem;
import com.beehyv.shoppingcart.repositories.OrderItemRepo;
import com.beehyv.shoppingcart.repositories.OrderRepo;
import com.beehyv.shoppingcart.services.CartService;
import com.beehyv.shoppingcart.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

        @Component
        public class OrderServiceImpl implements OrderService {

            @Autowired
            private CartService cartService;

            @Autowired
            private OrderRepo orderRepo;

            @Autowired
            private OrderItemRepo orderItemRepo;

            @Override
            public Order createOrder(int userId) {
                // Fetch cart items for the user
                List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);

                List<OrderItem> orderItems = new ArrayList<>();
                double totalPrice = 0.0;

                for (CartItem cartItem : cartItems) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setUserId(cartItem.getUser().getUserId());
                    // Calculate total price for the order
                    totalPrice += cartItem.getProduct().getPrice() * cartItem.getQuantity();

                    orderItems.add(orderItem);
                }
                Order order = new Order();

                order.setItems(orderItems);
                order.setPrice(totalPrice);
                order.setOrderStatus("placed");
                order.setUser(cartItems.get(0).getUser());

                Order savedOrder = orderRepo.save(order);

                // Save OrderItems in the database
                for (OrderItem orderItem : orderItems) {
                    orderItem.setOrder(savedOrder);
                    orderItemRepo.save(orderItem);
                }

                // Delete CartItems
                cartService.clearCart(userId);

                return savedOrder;
            }
            @Override
            public List<Order> getOrderHistory(int userId) {
                // Fetch orders for the user
                return orderRepo.findByUserUserId(userId);
            }
        }


