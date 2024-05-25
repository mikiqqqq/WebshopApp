package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.DiscountCode;
import com.spring_boot.webshop_app.repository.DiscountCodeRepo;
import com.spring_boot.webshop_app.service.DiscountCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountCodeServiceImpl implements DiscountCodeService {

    @Autowired
    DiscountCodeRepo discountCodeRepo;

    @Override
    public DiscountCode findFirstActive(){
        return discountCodeRepo.findTopByIsActiveIsTrue();
    }

    @Override
    public DiscountCode findByDiscountCode(String discountCode){
        return discountCodeRepo.findByCode(discountCode);
    }
}
