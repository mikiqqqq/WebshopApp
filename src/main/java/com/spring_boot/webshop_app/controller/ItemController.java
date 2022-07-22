package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.mapper.ItemDtoMapper;
import com.spring_boot.webshop_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemDtoMapper itemDtoMapper;

    @GetMapping(value = "/{id}")
    ResponseEntity<ItemDto> findById(@PathVariable Integer id) {

        return ResponseEntity
                .ok()
                .body(itemService.findById(id));

    }

    @GetMapping(value = "/by-name/{name}")
    ResponseEntity<List<ItemDto>> findByName(@PathVariable String name) {

        return ResponseEntity
                .ok()
                .body(itemService.findByName(name));

    }
}
