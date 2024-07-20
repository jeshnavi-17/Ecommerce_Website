package com.beehyv.shoppingcart.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Embeddable
@Data
public class Address {
	@Column(nullable=false)
	private String street;
	@Column(nullable=false)
	private String city;
	@Column(nullable=false)
	private String state;
	@Column(nullable=false)
	private int pincode;

}
