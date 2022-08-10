package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.dto.ItemDto;
import com.spring_boot.webshop_app.mapper.ItemDtoMapper;
import com.spring_boot.webshop_app.repository.ItemRepo;
import com.spring_boot.webshop_app.service.ItemService;
import com.spring_boot.webshop_app.sort.ItemDtoSorter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ItemDtoMapper itemDtoMapper;

    @Override
    public List<ItemDto> fetchAll(){
        return itemRepo.findAll()
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> findByItemIds(Integer[] ids) {
        return Arrays.stream(ids)
                .flatMap(id -> itemRepo.findByItemId(id).stream())
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> findByBrandIds(Integer[] ids){
        return Arrays.stream(ids)
                .flatMap(id -> itemRepo.findByBrandId(id).stream())
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    List<ItemDto> filteredItems;

    @Override
    public List<ItemDto> filter(Optional<Integer[]> brandIds, Optional<Long> uprLmt, Optional<Long> lwrLmt,
                                Optional<Integer> productTypeId, Optional<Integer> productionYear,
                                Optional<String> sortBy, Optional<String> sortOrder)
    {
        //Default
        filteredItems = fetchAll();

        //Filtering
        brandIds.ifPresent(integers -> filteredItems = Arrays.stream(integers)
                .flatMap(id ->
                        filteredItems.stream().filter(itemDto -> itemDto.getBrandId().equals(id)))
                .collect(Collectors.toList()));
        if(uprLmt.isPresent() && lwrLmt.isPresent()) {
            filteredItems = filteredItems.stream()
                    .filter(itemDto -> itemDto.getPrice() < uprLmt.get() && itemDto.getPrice() > lwrLmt.get())
                    .collect(Collectors.toList());
        }
        if(productTypeId.isPresent() && productTypeId.get().compareTo(0) > 0){
            filteredItems = filteredItems.stream()
                    .filter(itemDto -> itemDto.getProductTypeId().equals(productTypeId.get()))
                    .collect(Collectors.toList());
        }
        if(productionYear.isPresent() && productionYear.get().compareTo(0) > 0){
            filteredItems = filteredItems.stream()
                    .filter(itemDto -> itemDto.getProductionYear().equals(productionYear.get()))
                    .collect(Collectors.toList());
        }

        String price = "PRICE";
        String name = "NAME";

        //Sorting
        if(sortBy.isPresent() && sortOrder.isPresent()){
            if(sortBy.get().equalsIgnoreCase(price)){
                if(sortOrder.get().equalsIgnoreCase("ASC")){
                    filteredItems.sort(new ItemDtoSorter(price, "ASC"));
                }
                if(sortOrder.get().equalsIgnoreCase("DESC")){
                    filteredItems.sort(new ItemDtoSorter(price, "DESC"));
                }
            }
            if(sortBy.get().equalsIgnoreCase(name)) {
                if (sortOrder.get().equalsIgnoreCase("ASC")) {
                    filteredItems.sort(new ItemDtoSorter(name, "ASC"));
                }
                if (sortOrder.get().equalsIgnoreCase("DESC")) {
                    filteredItems.sort(new ItemDtoSorter(name, "DESC"));
                }
            }
        }

        return filteredItems;
    }

    @Override
    public List<ItemDto> findAllInPriceRange(Long uprLmt, Long lwrLimit){
        return itemRepo.findAllInPriceRange(uprLmt, lwrLimit)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemDto> findAllByNameContainsIgnoreCase(String target){
        return itemRepo.findAllByNameContainsIgnoreCase(target)
                .stream()
                .map(item -> itemDtoMapper.map(item))
                .collect(Collectors.toList());
    }
}
