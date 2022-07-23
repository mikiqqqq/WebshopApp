package com.spring_boot.webshop_app.form;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class OrderForm {

    private Integer id;

    @JsonFormat(pattern = "dd.MM.yyyy. HH:mm:ss")
    private LocalDateTime date;

    @NotNull(message = "Price Without PDV is required.")
    private Long priceWithNoPdvIncluded;

    @NotNull(message = "Total price is required.")
    private Long total;

    private Integer discountCode;

    @NotNull(message = "Payment method is required.")
    private Integer paymentMethod;

    @Size(min = 16, max = 19, message = "Invalid Credit Card Number")
    private String creditCardNumber;

    @NotNull(message = "E-mail is required.")
    private String email;

    @NotNull(message = "Phone number is required.")
    private Integer phoneNumber;

    @NotNull(message = "Delivery address is required.")
    private String deliveryAddress;

    private String note;
}
