package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.dto.BrandDto;
import com.spring_boot.webshop_app.mapper.BrandDtoMapper;
import com.spring_boot.webshop_app.repository.BrandRepo;
import com.spring_boot.webshop_app.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    BrandRepo brandRepo;

    @Autowired
    BrandDtoMapper brandDtoMapper;

    @Override
    public List<BrandDto> fetchAll(){
        return brandRepo.findAll()
                .stream()
                .map(brand -> brandDtoMapper.map(brand))
                .collect(Collectors.toList());
    }

    @Override
    public BrandDto findById(Integer id) {
        return brandRepo.findById(id)
                .map(brand -> brandDtoMapper.map(brand))
                .orElse(null);
    }
}
