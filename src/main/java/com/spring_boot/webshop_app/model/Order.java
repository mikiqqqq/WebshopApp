package com.spring_boot.webshop_app.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "NARUDZBA")
public class Order {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "DATUM")
    private LocalDate date;

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

    @Column(name = "ADRESA_DOSTAVE")
    private String deliveryAddress;

    @Column(name = "NAPOMENA")
    private String note;
}
