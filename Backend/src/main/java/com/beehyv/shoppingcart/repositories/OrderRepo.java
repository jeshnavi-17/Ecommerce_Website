package com.beehyv.shoppingcart.repositories;


import com.beehyv.shoppingcart.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Integer> {

    @Query(value = "SELECT * FROM customer_order WHERE user_id = :userId ORDER BY order_id DESC", nativeQuery = true)
    List<Order> findByUserUserId(@Param("userId") int userId);

}
