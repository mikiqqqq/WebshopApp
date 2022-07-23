package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.form.OrderForm;
import com.spring_boot.webshop_app.mapper.OrderFormMapper;
import com.spring_boot.webshop_app.model.Order;
import com.spring_boot.webshop_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping(value="/create")
    ResponseEntity<Order> create(@Valid @RequestBody OrderForm orderForm) {

        return new ResponseEntity<>(
                orderService.save(orderFormMapper.map(orderForm)),
                HttpStatus.CREATED
        );
    }

    @PutMapping(value="/update")
    ResponseEntity<Order> update(@Valid @RequestBody OrderForm orderForm) {

        Order updatedOrder = orderFormMapper.map(orderForm);

        return new ResponseEntity<>(
                orderService.update(updatedOrder.getId(), updatedOrder),
                HttpStatus.OK
        );
    }

    @DeleteMapping(value="delete/id={id}")
    ResponseEntity<String> delete(@PathVariable Integer id) {
        orderService.delete(id);

        return ResponseEntity
                .ok()
                .body("deleted");
    }
}
