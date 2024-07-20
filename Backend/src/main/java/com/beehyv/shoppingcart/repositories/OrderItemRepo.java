package com.beehyv.shoppingcart.repositories;


import com.beehyv.shoppingcart.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem,Integer> {
    OrderItem findByUserId(Integer userId);
}
