package com.beehyv.shoppingcart.services.impl;

import com.beehyv.shoppingcart.entities.CartItem;
import com.beehyv.shoppingcart.entities.Product;
import com.beehyv.shoppingcart.entities.User;
import com.beehyv.shoppingcart.repositories.CartItemRepo;
import com.beehyv.shoppingcart.repositories.ProductRepo;
import com.beehyv.shoppingcart.repositories.UserRepo;
import com.beehyv.shoppingcart.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CartServiceImpl implements CartService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CartItemRepo cartItemRepo;
    @Override
    public CartItem addToCart(Integer userId, Integer productId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // If the user already has this product in the cart
        CartItem existingCartItem = cartItemRepo.findByUserAndProduct(user, product);

        if (existingCartItem != null) {
            // If the product is already in the cart, increase the quantity
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
            return cartItemRepo.save(existingCartItem);
        } else {
            // If the product is not present in the cart, adding it to cart as cart item
            CartItem newCartItem = new CartItem();
            newCartItem.setUser(user);
            newCartItem.setProduct(product);
            newCartItem.setQuantity(1); // Initial quantity is 1
            return cartItemRepo.save(newCartItem);
        }
    }

    public String removeFromCart(int userId, int productId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if the user has this product in the cart
        CartItem cartItem = cartItemRepo.findByUserAndProduct(user, product);

        if (cartItem != null) {
            cartItemRepo.delete(cartItem);
            return product.getProductName() + " removed from cart";
        } else {
            return "Product not found in the cart";
        }
    }

    public CartItem changeQuantity(int cartItemId, int quantity) {

        CartItem cartItem = cartItemRepo.findById(cartItemId).orElseThrow(() -> new RuntimeException("CartItem not found"));
        // Update the quantity
        cartItem.setQuantity(quantity);
        return cartItemRepo.save(cartItem);


    }

    public CartItem getCartItemById(int cartItemId)
    {
        return cartItemRepo.findById(cartItemId).orElseThrow(() -> new RuntimeException("CartItem not found"));
    }

    public List<CartItem> getCartItemsByUserId(int userId) {
        return cartItemRepo.findByUserUserId(userId);
    }

    @Override
    public void clearCart(int userId) {
        List<CartItem> cartItems = cartItemRepo.findByUserUserId(userId);

        // Delete each cart item
        for (CartItem cartItem : cartItems) {
            cartItemRepo.delete(cartItem);
        }
    }
}
