package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.dto.ItemDto;

import java.util.List;

public interface ItemService {

    List<ItemDto> findAllByNameContainsIgnoreCase(String target);

    List<ItemDto> findByName(String name);

    List<ItemDto> findByBrandId(Integer id);

    List<ItemDto> findAllInPriceRange(Long uprLmt, Long lwrLimit);

    List<ItemDto> fetchAll();
}
