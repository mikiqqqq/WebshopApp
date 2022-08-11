package com.spring_boot.webshop_app.sort;

import com.spring_boot.webshop_app.dto.ItemDto;

import java.util.Comparator;

public class ItemDtoSorter implements Comparator<ItemDto> {
    private String sortBy, sortOrder;

    public ItemDtoSorter(String sortBy, String sortOrder){
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

    public int compare(ItemDto a, ItemDto b){
        if(sortBy.equalsIgnoreCase("PRICE")){
            if(sortOrder.equalsIgnoreCase("ASC"))
                return (int) (a.getPrice() - b.getPrice());
            if(sortOrder.equalsIgnoreCase("DESC"))
                return (int) (b.getPrice() - a.getPrice());
        }
        if (sortBy.equalsIgnoreCase("NAME")){
            if(sortOrder.equalsIgnoreCase("ASC"))
                return a.getName().compareTo(b.getName());
            if(sortOrder.equalsIgnoreCase("DESC"))
                return b.getName().compareTo(a.getName());
        }

        return 0;
    }
}