package com.spring_boot.webshop_app.repository;

import com.spring_boot.webshop_app.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepo extends JpaRepository<Brand, Integer> {
    List<Brand> findByName(String name);

}
