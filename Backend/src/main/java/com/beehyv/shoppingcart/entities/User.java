package com.beehyv.shoppingcart.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id", nullable=false)
	private int userId;
	@Column(name="email", nullable=false, unique=true)
	private String email;
	@Column(name="password",nullable=false)
	private String password;
	@Column(name="user_phone",length=10)
	private long userPhone;
	@Column(nullable=false)
	private String name;
	private String picture;
	@Embedded
	private Address addresses;

}
