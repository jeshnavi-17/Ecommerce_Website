package com.beehyv.shoppingcart.services;

import com.beehyv.shoppingcart.POJO.UserProfileResponse;
import com.beehyv.shoppingcart.entities.Address;
import com.beehyv.shoppingcart.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserProfileResponse getProfile(Integer userId);
    void updateProfile(UserProfileResponse request) throws UserNotFoundException;


}
