package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.enumeration.OrderStatus;
import com.spring_boot.webshop_app.model.Order;

public interface OrderService {
    Order fetchOrderById (Integer id);
    Integer save (Order order);
    Order fetchOrderByOrderStatus  ();
    void update (Integer id, Order updatedOrder);
    void delete (Integer id);
}
