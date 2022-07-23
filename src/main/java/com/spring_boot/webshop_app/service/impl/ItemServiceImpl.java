package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.mapper.ItemDtoMapper;
import com.spring_boot.webshop_app.model.Item;
import com.spring_boot.webshop_app.repository.ItemRepository;
import com.spring_boot.webshop_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemDtoMapper itemDtoMapper;


    @Override
    public List<ItemDto> findAllByNameContainsIgnoreCase(String target){
        return itemRepository.findAllByNameContainsIgnoreCase(target)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }


    @Override
    public List<ItemDto> findByName(String name) {
        return itemRepository.findByName(name)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }
}
