package com.spring_boot.webshop_app.form;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class OrderForm {

    private Integer id;

    @JsonFormat(pattern = "dd. MM. yyyy.")
    private LocalDate date;

    private Long priceWithNoPdvIncluded;
    private Long total;
    private Integer discountCode;
    private Integer paymentMethod;
    private String creditCardNumber;
    private String email;
    private Integer phoneNumber;
    private String deliveryAddress;
    private String note;
}
