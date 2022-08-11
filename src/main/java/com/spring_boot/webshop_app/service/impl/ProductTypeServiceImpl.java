package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.dto.BrandDto;
import com.spring_boot.webshop_app.mapper.BrandDtoMapper;
import com.spring_boot.webshop_app.model.ProductType;
import com.spring_boot.webshop_app.repository.BrandRepo;
import com.spring_boot.webshop_app.repository.ProductTypeRepo;
import com.spring_boot.webshop_app.service.BrandService;
import com.spring_boot.webshop_app.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    ProductTypeRepo productTypeRepo;

    @Override
    public List<ProductType> fetchAll(){
        return productTypeRepo.findAll();
    }
}
