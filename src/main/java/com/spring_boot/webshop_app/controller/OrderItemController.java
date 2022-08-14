package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.dto.OrderItemAndAmountDto;
import com.spring_boot.webshop_app.form.OrderItemForm;
import com.spring_boot.webshop_app.mapper.OrderItemFormMapper;
import com.spring_boot.webshop_app.model.Order;
import com.spring_boot.webshop_app.model.OrderItem;
import com.spring_boot.webshop_app.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping(value="/find-all-by-orderId/{orderId}")
    ResponseEntity<List<OrderItem>> findAllByOrderId(@PathVariable Integer orderId) {

        return ResponseEntity
                .ok()
                .body(orderItemService.findAllByOrderId(orderId));
    }

    @GetMapping(value="/get-orderItemAmount/{orderId}")
    ResponseEntity<List<OrderItemAndAmountDto>> getOrderItemAmount(@PathVariable Integer orderId) {

        return ResponseEntity
                .ok()
                .body(orderItemService.findItemsAndAmountInOrder(orderId));
    }

    @DeleteMapping(value="/delete-all-by-itemId/itemId={itemId}&orderId={orderId}")
    ResponseEntity<String> deleteAllByItemId(@PathVariable Integer itemId, @PathVariable Integer orderId) {
        orderItemService.deleteAllByItemIdAndOrderId(itemId, orderId);

        return ResponseEntity
                .ok()
                .body("deleted");
    }

    @DeleteMapping(value="/delete/orderId={orderId}&itemId={itemId}")
    ResponseEntity<String> delete(@PathVariable Integer orderId, @PathVariable Integer itemId) {
        orderItemService.delete(orderId, itemId);

        return ResponseEntity
                .ok()
                .body("deleted");
    }
}
