package com.beehyv.shoppingcart.controllers;

import com.beehyv.shoppingcart.POJO.UserProfileResponse;
import com.beehyv.shoppingcart.entities.User;
import com.beehyv.shoppingcart.exception.UserNotFoundException;
import com.beehyv.shoppingcart.services.UserService;
import com.beehyv.shoppingcart.services.impl.ProductServiceImpl;
import com.beehyv.shoppingcart.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    public UserService userService;
    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileResponse> getProfile(@PathVariable Integer userId) {
        try {
            UserProfileResponse userProfileResponse = userService.getProfile(userId);
            return new ResponseEntity<>(userProfileResponse, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/updateProfile")
    public ResponseEntity<String> updateProfile(@RequestBody UserProfileResponse request) {
        try {
            userService.updateProfile(request);
            return ResponseEntity.ok("Success");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failure");
        }
    }

}
