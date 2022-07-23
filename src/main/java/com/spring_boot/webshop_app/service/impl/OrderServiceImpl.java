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
    public void save(Order order){
        orderRepo.save(order);
    }
}
