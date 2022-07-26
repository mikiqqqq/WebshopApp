package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping(value = "/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;


    @GetMapping(value = "/fetch-all")
    ResponseEntity<List<ItemDto>> fetchAll() {

        return ResponseEntity
                .ok()
                .body(itemService.fetchAll());
    }

    @GetMapping(value = "/by-name/{name}")
    ResponseEntity<List<ItemDto>> findByName(@PathVariable String name) {

        return ResponseEntity
                .ok()
                .body(itemService.findByName(name));

    }

    @GetMapping(value = "/by-brandId/{id}")
    ResponseEntity<List<ItemDto>> findByBrandId(@PathVariable Integer id) {

        return ResponseEntity
                .ok()
                .body(itemService.findByBrandId(id));
    }

    @GetMapping(value = "/in-price-range/{uprLmt}-{lwrLmt}")
    ResponseEntity<List<ItemDto>> findAllInPriceRange(@PathVariable Long uprLmt, @PathVariable Long lwrLmt){

        return ResponseEntity
                .ok()
                .body(itemService.findAllInPriceRange(uprLmt, lwrLmt));
    }


    @GetMapping(value = "contain/{target}")
    ResponseEntity<List<ItemDto>> findAllByNameContainsIgnoreCase(@PathVariable String target) {

        return ResponseEntity
                .ok()
                .body(itemService.findAllByNameContainsIgnoreCase(target));
    }
}
