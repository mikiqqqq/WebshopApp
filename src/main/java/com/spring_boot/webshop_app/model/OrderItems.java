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
@Table(name = "NARUDZBA_PROIZVODI")
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
