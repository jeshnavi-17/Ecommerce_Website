package com.beehyv.shoppingcart.POJO;

import com.beehyv.shoppingcart.entities.Address;



public class UserProfileResponse {
    private int userId;
    private String name;
    private String email;
    private long phone;

    private String picture;
    private Address addresses;

    public UserProfileResponse(int userId, String name, String email, long phone, String picture, Address addresses) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.picture = picture;
        this.addresses = addresses;
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Address getAddresses() {
        return addresses;
    }

    public void setAddresses(Address addresses) {
        this.addresses = addresses;
    }
}