package com.spring_boot.webshop_app.repository;

import com.spring_boot.webshop_app.model.Item;

import java.util.List;

public interface ItemCustomRepo {

    List<Item> findByName(String name);

    List<Item> findByBrandId(Integer id);

    List<Item> findAllInPriceRange(Long uprLmt, Long lwrLimit);
}
