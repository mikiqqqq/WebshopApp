import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { SearchOptions, AddItem, Hit } from "./MainContainerData";
import style from "./MainContainer.module.css"
import FixedSidebar from "./fixed_sidebar/FixedSidebar";
import Items from "./item_container/Items";
import ItemService from "../services/ItemService";
import DiscounCodeService from "../services/DiscountCodeService";
import OrderService from "../services/OrderService";
import OrderItemService from "../services/OrderItemService";
import { FilterOptions } from "./fixed_sidebar/filter/brand/Brand";
import Support from "./support/Support";
import { BrowserRouter, Route, Router, Routes, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";

interface Props{
    addItemToCart: (item: AddItem) => void;
}

const MainContainer:React.FunctionComponent<Props> = props => {
    let [searchParams] = useSearchParams();
    const [items, setItems] = useState<Array<Hit>>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        brandIds: [] as number[],
        uprLmt: 5000,
        lwrLmt: 0,
        productTypeId: 0,
        productionYear: 0,
        sortBy: "NAME",
        sortOrder: "ASC"
    })


    useEffect(() => {
        if(searchParams.get('search') === null){
            ItemService.filterItems(filterOptions).then((response) => {
                setItems(response.data);
            });
        }else{
            let target: string = (searchParams.get('search') || " ");
            fetchItemsContainingTarget(target);
        }
    }, [searchParams, filterOptions]);

    const fetchItemsContainingTarget = (searchOptions: string) => {
        ItemService.findAllThatContainTarget(searchOptions).then((response) => {
            setItems(response.data);
        });
    }

    const handlePriceFilterOptions = (filterOptions: FilterOptions) => {
        setFilterOptions(filterOptions);
    };

    return(
                <main className={style.main}>
                    <FixedSidebar filterOptions={filterOptions} onFilterOptions={handlePriceFilterOptions} />
                    <Items addItemToCart={props.addItemToCart} data={items} />
                </main>
    );
}

export default MainContainer;