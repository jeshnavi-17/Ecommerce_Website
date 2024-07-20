package com.beehyv.shoppingcart.repositories;

import com.beehyv.shoppingcart.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {

    @Query(value = "SELECT * FROM product p " +
            "WHERE " +
            "(:keyword IS NULL OR LOWER(p.product_name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.details) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND " +
            "(:category IS NULL OR :category = '' OR LOWER(p.category) = LOWER(:category)) " +
            "AND " +
            "(:brand IS NULL OR LOWER(p.brand) = LOWER(:brand))"
            ,
            countQuery = "SELECT  COUNT(*) FROM product p " +
                    "WHERE " +
                    "(:keyword IS NULL OR LOWER(p.product_name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.details) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                    "AND " +
                    "(:category IS NULL OR  :category = '' OR LOWER(p.category) = LOWER(:category)) " +
                    "AND " +
                    "(:brand IS NULL OR LOWER(p.brand) = LOWER(:brand))",
            nativeQuery = true)
    Page<Product> findProductsByKeywordAndCategoryAndBrand(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("brand") String brand,
            Pageable pageable);
}
