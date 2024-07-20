package com.beehyv.shoppingcart.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
public class Product
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id", nullable=false)
	private Integer productId;
	@Column(name="product_name", nullable=false)
	private String productName;
	@Column(nullable = false)
	private double price;
	@Column(nullable = false)
	private String details;
	@Column(nullable = false)
	private String brand;
	@Column(nullable = false)
	private String category;
	@Column(nullable = false)
	private String subCategory;
	@Column(name="product_image")
	private String productImage;
}
