package com.beehyv.shoppingcart.services;

import com.beehyv.shoppingcart.entities.CartItem;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public interface CartService {
    CartItem addToCart(Integer userId, Integer productId);
    String removeFromCart(int userId, int productId);
    CartItem changeQuantity(int cartItemId,  int quantity);
    CartItem getCartItemById(int cartItemId);

    List<CartItem> getCartItemsByUserId(int userId);

    void clearCart(int userId);
}
