package com.spring_boot.webshop_app.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class OrderItems {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NARUDZBA_ID")
    private Integer orderId;

    @Column(name = "PROIZVOD_ID")
    private Integer itemId;
}
