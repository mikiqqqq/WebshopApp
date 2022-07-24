package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.mapper.ItemDtoMapper;
import com.spring_boot.webshop_app.repository.ItemRepo;
import com.spring_boot.webshop_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ItemDtoMapper itemDtoMapper;


    @Override
    public List<ItemDto> fetchAll(){
        return itemRepo.findAll()
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> findByName(String name) {
        return itemRepo.findByName(name)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> findAllByNameContainsIgnoreCase(String target){
        return itemRepo.findAllByNameContainsIgnoreCase(target)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }
}
