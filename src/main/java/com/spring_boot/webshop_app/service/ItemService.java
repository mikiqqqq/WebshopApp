package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.dto.ItemDto;

import java.util.List;
import java.util.Optional;

public interface ItemService {

    List<ItemDto> findAllByNameContainsIgnoreCase(String target);

    List<ItemDto> findByItemIds(Integer[] ids);

    List<ItemDto> findByBrandIds(Integer[] ids);

    List<ItemDto> findAllInPriceRange(Long uprLmt, Long lwrLimit);
    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    List<ItemDto> filter(Optional<Integer[]> ids, Optional<Long> uprLmt, Optional<Long> lwrLmt,
                         Optional<Integer> productTypeId, Optional<Integer> productionYear,
                         Optional<String> sortBy, Optional<String> sortOrder);

    List<ItemDto> fetchAll();
}
