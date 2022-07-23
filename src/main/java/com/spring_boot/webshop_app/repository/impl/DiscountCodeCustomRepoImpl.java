package com.spring_boot.webshop_app.repository.impl;

import com.spring_boot.webshop_app.model.DiscountCode;
import com.spring_boot.webshop_app.repository.DiscountCodeCustomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class DiscountCodeCustomRepoImpl implements DiscountCodeCustomRepo {
    @Autowired
    private EntityManager entityManager;

    @Override
    public DiscountCode findFirstActive() {

        return entityManager
                .createQuery("select d from DiscountCode d where d.isActive = true ", DiscountCode.class)
                .getSingleResult();

    }
}
