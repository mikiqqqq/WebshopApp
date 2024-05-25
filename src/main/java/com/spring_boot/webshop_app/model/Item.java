package com.spring_boot.webshop_app.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

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
    private BigDecimal price;

    @Column(name = "KOLICINA")
    private Integer amount;

    @Column(name = "BRAND_ID")
    private Integer brandId;

    @Column(name = "TIP_ID")
    private Integer productTypeId;

    @Column(name = "GODINA")
    private Integer productionYear;
}
