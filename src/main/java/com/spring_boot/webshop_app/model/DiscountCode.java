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
@Table(name = "POPUST_KODOVI")
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
