package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.form.OrderForm;
import com.spring_boot.webshop_app.mapper.OrderFormMapper;
import com.spring_boot.webshop_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderFormMapper orderFormMapper;

    @PostMapping
    ResponseEntity<String> create(@Valid @RequestBody OrderForm orderForm) {

        orderService.save(orderFormMapper.map(orderForm));

        return ResponseEntity
                .ok()
                .body("created");

    }

    @ExceptionHandler
    ResponseEntity<String> handleException(Exception exception) {

        return ResponseEntity
                .internalServerError()
                .body(exception.getMessage());

    }
}
