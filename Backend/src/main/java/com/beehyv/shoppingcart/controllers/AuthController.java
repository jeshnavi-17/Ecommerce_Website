package com.beehyv.shoppingcart.controllers;


import com.beehyv.shoppingcart.POJO.LoginRequest;
import com.beehyv.shoppingcart.entities.User;
import com.beehyv.shoppingcart.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User newUser) {
        // Check if the user already exists
        if (userRepository.findByEmail(newUser.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"error\":\"User already exists\"}");
        }

        userRepository.save(newUser);

        // Return the userId in the response
        return ResponseEntity.ok("{\"userId\":\"" + newUser.getUserId() + "\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Find the user by email
        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // Password matches, return success response
            HttpHeaders headers = new HttpHeaders();
            // Set cookies in the HttpHeaders
            headers.add(HttpHeaders.SET_COOKIE, "userid ="+user.getUserId()+" ; Path=/; Max-Age=604800; ");

            // Create the ResponseEntity with the desired status code, headers, and body

            return ResponseEntity.ok()
                    .headers(headers)
                    .body("{\"result\":\"Success\", \"userId\":\"" + user.getUserId() + "\"}");

        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"result\":\"failure\"}");
        }

    }


}
