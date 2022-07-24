package com.spring_boot.webshop_app.mapper;

import com.spring_boot.webshop_app.form.OrderItemForm;
import com.spring_boot.webshop_app.model.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemFormMapper {

    public OrderItem map(OrderItemForm orderItemForm) {

        if (orderItemForm == null) {
            return null;
        }

        return OrderItem.builder()
                .orderId(orderItemForm.getOrderId())
                .itemId(orderItemForm.getItemId())
                .build();
    }
}
