package com.spring_boot.webshop_app.mapper;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.model.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemDtoMapper {

    public ItemDto map(Item item) {

        if (item == null) {
            return null;
        }

        return ItemDto.builder()
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .build();
    }
}
