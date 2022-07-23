package com.spring_boot.webshop_app.repository;

import com.spring_boot.webshop_app.model.DiscountCode;

public interface DiscountCodeCustomRepo {
    DiscountCode findFirstActive();
}
