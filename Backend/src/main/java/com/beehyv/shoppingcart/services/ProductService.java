package com.beehyv.shoppingcart.services;

import com.beehyv.shoppingcart.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    Product addProduct(Product product);
    Product modifyProduct(Integer id, Product product);

    Product getProductById(Integer productId);
    Page<Product> findProductsByKeywordAndCategoryAndBrand(String keyword, String category, String brand, Pageable pageable);
}
