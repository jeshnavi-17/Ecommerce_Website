package com.beehyv.shoppingcart.controllers;

import com.beehyv.shoppingcart.entities.CartItem;
import com.beehyv.shoppingcart.services.CartService;
import com.beehyv.shoppingcart.services.impl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController
{
    @Autowired
    private CartService cartService;
    @GetMapping("/{userId}/add/{productId}")
    public CartItem addToCart(@PathVariable("userId") Integer userId, @PathVariable("productId") Integer productId )
    {
            return cartService.addToCart(userId , productId);
    }
    @GetMapping("/{userId}/remove/{productId}")
    public String removeFromCart(@PathVariable int userId, @PathVariable int productId) {
        return cartService.removeFromCart(userId, productId);
    }
    @PostMapping("/changeQuantity/{cartItemId}")
    public CartItem changeQuantity(@PathVariable int cartItemId, @RequestBody int quantity) {
        return cartService.changeQuantity(cartItemId, quantity);
    }
    @GetMapping("/{userId}/getCartItem/{cartItemId}")
    public CartItem getCartItemById(
            @PathVariable int userId,
            @PathVariable int cartItemId) {
        return cartService.getCartItemById(cartItemId);
    }
    @GetMapping("/{userId}/getCart")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable int userId) {
        // getting the user's cart based on userId
        List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);

        // Returning the list of cart items with HttpStatus.OK
        return ResponseEntity.ok(cartItems);
    }
}
