package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.dto.OrderItemAndAmountDto;
import com.spring_boot.webshop_app.model.OrderItem;

import java.util.List;

public interface OrderItemService {

    OrderItem save (OrderItem orderItem);
    List<OrderItem> findAllByOrderId(Integer orderId);
    Long findAllByItemIdInOrder(Integer itemId, Integer ordedId);
    List<OrderItemAndAmountDto> findItemsAndAmountInOrder(Integer orderId);
    void deleteAllByItemIdAndOrderId(Integer itemId, Integer orderId);
    void delete(Integer orderId, Integer itemId);
}
