package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.form.OrderItemForm;
import com.spring_boot.webshop_app.model.OrderItem;

public interface OrderItemService {

    OrderItem save (OrderItem orderItem);

    void delete(Integer id);
}
