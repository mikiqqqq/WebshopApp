package com.spring_boot.webshop_app.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "ORDER_ITEMS")
public class OrderItem {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ORDER_ID")
    private Integer orderId;

    @Column(name = "ITEM_ID")
    private Integer itemId;
}
