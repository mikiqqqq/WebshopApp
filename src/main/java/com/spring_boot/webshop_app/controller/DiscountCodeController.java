package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.model.DiscountCode;
import com.spring_boot.webshop_app.service.DiscountCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/discount-code")
public class DiscountCodeController {

    @Autowired
    private DiscountCodeService discountCodeService;

    @GetMapping(value = "/get-active")
    ResponseEntity<DiscountCode> getActive() {

        return ResponseEntity
                .ok()
                .body(discountCodeService.findFirstActive());

    }
}
