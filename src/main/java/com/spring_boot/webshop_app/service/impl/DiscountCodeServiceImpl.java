package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.DiscountCode;
import com.spring_boot.webshop_app.repository.DiscountCodeCustomRepo;
import com.spring_boot.webshop_app.service.DiscountCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountCodeServiceImpl implements DiscountCodeService {

    @Autowired
    DiscountCodeCustomRepo discountCodeCustomRepo;

    @Override
    public DiscountCode findFirstActive(){
        return discountCodeCustomRepo.findFirstActive();
    }
}
