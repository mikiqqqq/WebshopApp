package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.form.OrderItemForm;
import com.spring_boot.webshop_app.mapper.OrderItemFormMapper;
import com.spring_boot.webshop_app.model.OrderItem;
import com.spring_boot.webshop_app.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping(value = "/api/order-item")
public class OrderItemController {

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    OrderItemFormMapper orderItemFormMapper;

    @PostMapping(value="/add")
    ResponseEntity<OrderItem> create(@Valid @RequestBody OrderItemForm orderItemForm) {

        return new ResponseEntity<>(
                orderItemService.save(orderItemFormMapper.map(orderItemForm)),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping(value="delete/id={id}")
    ResponseEntity<String> delete(@PathVariable Integer id) {
        orderItemService.delete(id);

        return ResponseEntity
                .ok()
                .body("deleted");
    }
}
