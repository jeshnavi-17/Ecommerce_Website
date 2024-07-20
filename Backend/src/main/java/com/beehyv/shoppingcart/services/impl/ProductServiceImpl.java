package com.beehyv.shoppingcart.services.impl;


import com.beehyv.shoppingcart.entities.Product;
import com.beehyv.shoppingcart.repositories.ProductRepo;
import com.beehyv.shoppingcart.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepository;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    @Override
    public Product modifyProduct(Integer id, Product product){
        Product currentProduct = productRepository.findById(id).orElse(null);
        if (currentProduct != null) {
            // Updating fields with values of new product
            currentProduct.setProductName(product.getProductName());
            currentProduct.setPrice(product.getPrice());
            currentProduct.setBrand(product.getBrand());
            currentProduct.setDetails(product.getDetails());
            currentProduct.setCategory(product.getCategory());
            currentProduct.setSubCategory(product.getSubCategory());
            currentProduct.setProductImage(product.getProductImage());
            // Save the updated product to the database
            return productRepository.save(currentProduct);
        }
        return null;
    }
    @Override
    public Product getProductById(Integer productId) {
        return productRepository.findById(productId).orElse(null);
    }
    @Override
    public Page<Product> findProductsByKeywordAndCategoryAndBrand(String keyword, String category, String brand, Pageable pageable) {
       return productRepository.findProductsByKeywordAndCategoryAndBrand(keyword, category,brand,pageable);
    }
}
