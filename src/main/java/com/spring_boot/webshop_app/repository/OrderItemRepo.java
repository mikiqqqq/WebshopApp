package com.spring_boot.webshop_app.repository;

import com.spring_boot.webshop_app.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {
}
