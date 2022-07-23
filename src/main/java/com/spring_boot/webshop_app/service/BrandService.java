package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.model.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> findByName(String name);
}
