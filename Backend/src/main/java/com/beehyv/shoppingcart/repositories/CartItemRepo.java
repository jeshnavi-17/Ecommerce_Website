package com.beehyv.shoppingcart.repositories;


import com.beehyv.shoppingcart.entities.CartItem;
import com.beehyv.shoppingcart.entities.Product;
import com.beehyv.shoppingcart.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem,Integer> {
    CartItem findByUserAndProduct(User user, Product product);
    List<CartItem> findByUserUserId(int userId);
}
