package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.model.Order;

import java.util.List;

public interface OrderService {
    Order fetchOrderById (Integer id);
    Integer save (Order order);
    List<Order> fetchActiveOrders ();
    List<Order> fetchCompletedOrders ();
    void update (Integer id, Order updatedOrder);
    void delete (Integer id);
}
