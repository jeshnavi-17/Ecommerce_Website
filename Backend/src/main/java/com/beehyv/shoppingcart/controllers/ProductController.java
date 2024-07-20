package com.beehyv.shoppingcart.controllers;

import com.beehyv.shoppingcart.entities.Product;
import com.beehyv.shoppingcart.services.ProductService;
import com.beehyv.shoppingcart.services.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        Integer id = product.getProductId();
        if (id != null) {
            Product modifiedProduct = productService.modifyProduct(id, product);

            if (modifiedProduct != null) {
                return new ResponseEntity<>(modifiedProduct, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Product not found
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Invalid request, productId is required
        }
    }
    @GetMapping("/getById/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer productId) {
        Product product = productService.getProductById(productId);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/search")
    public Page<Product> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false, defaultValue = "0") Integer pageNumber,
            @RequestParam(required = false, defaultValue = "5") Integer pageSize,
            @RequestParam(required = false, defaultValue = "brand") String sortField,
            @RequestParam(required = false, defaultValue = "desc") String sortOrder) {

        // Define sorting direction
        Sort.Direction direction = sortOrder.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

        // Define sorting criteria
        Sort sort = Sort.by(direction, sortField);

        // Create Pageable with sorting
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        return productService.findProductsByKeywordAndCategoryAndBrand(keyword, category, brand, pageable);
    }


}
