package com.spring_boot.webshop_app.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class Order {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "DATUM")
    private LocalDateTime datum;

    @Column(name = "UKUPNA_CIJENA_BEZ_P")
    private Long priceWithNoPdvIncluded;

    @Column(name = "UKUPNA_CIJENA_S_P")
    private Long total;

    @Column(name = "KOD_ZA_POPUST_ID")
    private Integer discountCode;

    @Column(name = "NACIN_PLACANJA_ID")
    private Integer paymentMethod;

    @Column(name = "BROJ_KARTICE")
    private String creditCardNumber;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "BROJ_MOBITELA")
    private Integer phoneNumber;

    @Column(name = "OADRESA_DOSTAVEPIS")
    private String deliveryAddress;

    @Column(name = "NAPOMENA")
    private String note;
}
