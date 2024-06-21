package com.spring_boot.webshop_app.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ItemDto {
    private Integer id;
    private byte[] image;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer amount;
    private Integer brandId;
    private Integer productTypeId;
    private Integer productionYear;
}
