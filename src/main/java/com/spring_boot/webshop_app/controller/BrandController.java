package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.model.Brand;
import com.spring_boot.webshop_app.service.BrandService;
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
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping(value = "/by-name/{name}")
    ResponseEntity<List<Brand>> findByName(@PathVariable String name) {

        return ResponseEntity
                .ok()
                .body(brandService.findByName(name));
    }
}
