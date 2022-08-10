package com.spring_boot.webshop_app.repository;

import com.spring_boot.webshop_app.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findAllByOrderId(Integer orderId);

    List<OrderItem> findAllByItemId(Integer itemId);
}
