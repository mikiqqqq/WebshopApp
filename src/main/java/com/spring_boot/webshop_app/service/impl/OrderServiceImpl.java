package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.Order;
import com.spring_boot.webshop_app.repository.OrderRepo;
import com.spring_boot.webshop_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepo orderRepo;

    @Override
    public Order save(Order order){
        orderRepo.save(order);
        return order;
    }

    @Override
    public Order update(Integer orderId, Order updatedOrder) {
        updatedOrder.setId(orderId);
        orderRepo.save(updatedOrder);

        return updatedOrder;
    }

    @Override
    public void delete(Integer id) {
        orderRepo.deleteById(id);
    }
}
