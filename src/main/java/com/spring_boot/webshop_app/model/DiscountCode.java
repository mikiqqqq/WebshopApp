package com.spring_boot.webshop_app.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class DiscountCode {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "KOD")
    private String code;

    @Column(name = "POPUST")
    private String discountAmount;

    @Column(name = "ISKORISTEN")
    private Long isActive;
}
