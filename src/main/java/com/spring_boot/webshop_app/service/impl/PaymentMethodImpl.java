package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.PaymentMethod;
import com.spring_boot.webshop_app.repository.PaymentMethodRepo;
import com.spring_boot.webshop_app.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodImpl implements PaymentMethodService {

    @Autowired
    PaymentMethodRepo paymentMethodRepo;

    @Override
    public List<PaymentMethod> getAll() {
        return paymentMethodRepo.findAll();
    }
}
