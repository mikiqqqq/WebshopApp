package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.dto.ItemDto;

import java.util.List;

public interface ItemService {

    ItemDto findById(Integer id);

    List<ItemDto> findByName(String name);
}
