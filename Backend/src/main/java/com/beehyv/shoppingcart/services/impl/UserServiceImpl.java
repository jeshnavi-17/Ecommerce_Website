package com.beehyv.shoppingcart.services.impl;

import com.beehyv.shoppingcart.POJO.UserProfileResponse;
import com.beehyv.shoppingcart.entities.User;
import com.beehyv.shoppingcart.exception.UserNotFoundException;
import com.beehyv.shoppingcart.repositories.UserRepo;
import com.beehyv.shoppingcart.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepository;

    @Override
    public UserProfileResponse getProfile(Integer userId){
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return new UserProfileResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getUserPhone(),
                    user.getPicture(),
                    user.getAddresses()
            );
        } else {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
    }

    @Override
    public void updateProfile(UserProfileResponse request){
        User user = userRepository.findById(request.getUserId()).orElse(null);

        if (user != null) {
            // Update user fields based on the request
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setUserPhone(request.getPhone());
            // Update address fields
            user.setAddresses(request.getAddresses());

            // Save the updated user
            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User not found with ID: " + request.getUserId());
        }
    }
}
