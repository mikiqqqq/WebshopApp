package com.spring_boot.webshop_app.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "PROIZVOD")
public class Item {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NAZIV")
    private String name;

    @Column(name = "OPIS")
    private String description;

    @Column(name = "CIJENA")
    private Long price;

    @Column(name = "KOLICINA")
    private Integer amount;

    @Column(name = "BRAND_ID")
    private Integer brandId;
}
