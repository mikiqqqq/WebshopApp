package com.spring_boot.webshop_app.mapper;

import com.spring_boot.webshop_app.dto.BrandDto;
import com.spring_boot.webshop_app.dto.OrderItemAndAmountDto;
import com.spring_boot.webshop_app.model.Brand;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OrderItemAndAmountDtoMapper {
    public OrderItemAndAmountDto map(Integer itemId, Long itemAmount) {

        if (itemId == null || itemAmount == null) {
            return null;
        }

        return OrderItemAndAmountDto.builder()
                .id(itemId)
                .quantity(itemAmount)
                .build();
    }
}
