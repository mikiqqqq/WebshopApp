package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.Brand;
import com.spring_boot.webshop_app.repository.BrandRepo;
import com.spring_boot.webshop_app.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    BrandRepo brandRepo;

    @Override
    public List<Brand> fetchAll(){
        return new ArrayList<>(brandRepo.findAll());
    }


    @Override
    public List<Brand> findByName(String name) {
        return new ArrayList<>(brandRepo.findByName(name));
    }
}
