package com.spring_boot.webshop_app.service.impl;


import com.spring_boot.webshop_app.dto.OrderItemAndAmountDto;
import com.spring_boot.webshop_app.mapper.OrderItemAndAmountDtoMapper;
import com.spring_boot.webshop_app.model.OrderItem;
import com.spring_boot.webshop_app.repository.OrderItemRepo;
import com.spring_boot.webshop_app.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepo orderItemRepo;

    private final OrderItemAndAmountDtoMapper orderItemAndAmountDtoMapper;

    @Autowired
    public OrderItemServiceImpl(OrderItemRepo orderItemRepo, OrderItemAndAmountDtoMapper orderItemAndAmountDtoMapper) {
        this.orderItemRepo = orderItemRepo;
        this.orderItemAndAmountDtoMapper = orderItemAndAmountDtoMapper;
    }

    @Override
    @Transactional
    public OrderItem save(OrderItem orderItem){
        orderItemRepo.save(orderItem);
        return orderItem;
    }

    @Override
    @Transactional
    public void saveMultiple(OrderItem orderItem, Integer quantity) {
        List<OrderItem> orderItemList = new ArrayList<>();
        for(int i = 0; i < quantity; i++) {
            orderItemList.add(OrderItem.builder()
                    .itemId(orderItem.getItemId())
                    .orderId(orderItem.getOrderId())
                    .build());
        }
        orderItemRepo.saveAll(orderItemList);
    }

    @Override
    public List<OrderItemAndAmountDto> findItemsAndAmountInOrder(Integer orderId){
        Map<Integer, Long> map = orderItemRepo.findAllByOrderId(orderId)
                        .stream()
                        .map(OrderItem::getItemId)
                        .collect(Collectors.groupingBy(i -> i, Collectors.counting()));

        return map.entrySet()
                .stream()
                .map(item -> orderItemAndAmountDtoMapper.map(item.getKey(), item.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderItem> findAllByOrderId(Integer orderId){
        return orderItemRepo.findAllByOrderId(orderId);
    }

    @Override
    @Transactional
    public void deleteAllByItemIdAndOrderId(Integer orderItemId, Integer orderId){
        orderItemRepo.deleteAllByItemIdAndOrderId(orderItemId, orderId);
    }

    @Override
    @Transactional
    public void delete(Integer orderId, Integer itemId) {
        orderItemRepo.delete(
                orderItemRepo.findTopByOrderIdAndItemId(
                        orderId, itemId));
    }

    @Override
    @Transactional
    public void deleteAllByOrderId(Integer orderId){
        orderItemRepo.deleteAllByOrderId(orderId);
    }
}
