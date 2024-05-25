package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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

    @GetMapping(value = "/by-itemIds/{ids}")
    ResponseEntity<List<ItemDto>> findByItemIds(@PathVariable Integer[] ids) {

        return ResponseEntity
                .ok()
                .body(itemService.findByItemIds(ids));
    }

    @GetMapping(value = "/by-brandIds/{ids}")
    ResponseEntity<List<ItemDto>> findByBrandIds(@PathVariable Integer[] ids) {

        return ResponseEntity
                .ok()
                .body(itemService.findByBrandIds(ids));
    }

    @GetMapping(value = "/filter-items-by")
    @ResponseBody
    ResponseEntity<List<ItemDto>> filterItemsBy(
            @RequestParam(value = "brandIds") Optional<Integer[]> brandIds,
            @RequestParam(value = "uprLmt") Optional<BigDecimal> uprLmt,
            @RequestParam(value = "lwrLmt") Optional<BigDecimal> lwrLmt,
            @RequestParam(value = "productTypeId") Optional<Integer> productTypeId,
            @RequestParam(value = "productionYear") Optional<Integer> productionYear,
            @RequestParam(value = "sortBy") Optional<String> sortBy,
            @RequestParam(value = "sortOrder") Optional<String> sortOrder) {

        return ResponseEntity.ok().body(itemService.
                filter(brandIds, uprLmt, lwrLmt, productTypeId, productionYear, sortBy, sortOrder));
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
