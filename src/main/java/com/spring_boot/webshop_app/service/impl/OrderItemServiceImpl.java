package com.spring_boot.webshop_app.service.impl;


import com.spring_boot.webshop_app.model.OrderItem;
import com.spring_boot.webshop_app.repository.OrderItemRepo;
import com.spring_boot.webshop_app.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemRepo orderItemRepo;

    @Override
    public OrderItem save(OrderItem orderItem){
        orderItemRepo.save(orderItem);
        return orderItem;
    }

    @Override
    public void delete(Integer id) {
        orderItemRepo.deleteById(id);
    }
}
