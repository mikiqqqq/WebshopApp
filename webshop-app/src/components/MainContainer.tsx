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

}

interface OrderItemAndAmount{
    id: number;
    quantity: number;
}
var orderItemAndAmount = new Array<OrderItemAndAmount>();

var orderId: number = 0;
const MainContainer:React.FunctionComponent<Props> = () => {
    let [searchParams] = useSearchParams();
    const [items, setItems] = useState<Array<Hit>>([]);
    const [discountCode, setDiscountCode] = useState<string>('');
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        brandIds: [] as number[],
        uprLmt: 5000,
        lwrLmt: 0,
        productTypeId: 0,
        productionYear: 0,
        sortBy: "NAME",
        sortOrder: "ASC"
    })
    const [activeOrder, setActiveOrder] = useState<number>(0);
    const[color, changeColor] = useState<string>('');
    const [orderItems, setOrderItems] = useState<Array<Hit>>([]);
    let orderItemsArray = new Array<Hit>();

    useEffect(() => {
        fetchActiveDiscountCode();
    }, []);

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

    const fetchActiveDiscountCode = () => {
        DiscounCodeService.fetchActiveDiscountCode().then((response) => {
            setDiscountCode(response.data.code);
        });
    }

    const fetchItemsContainingTarget = (searchOptions: string) => {
        ItemService.findAllThatContainTarget(searchOptions).then((response) => {
            setItems(response.data);
        });
    }

    const handlePriceFilterOptions = (filterOptions: FilterOptions) => {
        setFilterOptions(filterOptions);
    };

    const addItemToTheCart = async (item: AddItem) => {
        if(item.firstAdded){
            OrderService.createOrder(new Date().toLocaleDateString('hr-HR'));
            orderId++;
            setActiveOrder(orderId);
            changeColor('red');
        }
            await OrderItemService.createOrderItem(orderId, item.itemId);
            orderItemAndAmount = (await OrderItemService.getOrderItemAmount(orderId)).data;
            orderItemsArray = (await ItemService.findItemByItemId(orderItemAndAmount.map(item => item.id))).data;

            setOrderItems(orderItemsArray.map(item => 
                ({ ...item, ...orderItemAndAmount.find(orderItem => orderItem.id === item.id) }))
            );
    }

    return(
            <div className={style.page}>
                <Header discount={discountCode} red={color} activeOrder={activeOrder} orderItems={orderItems} />
                <main className={style.main}>
                <FixedSidebar filterOptions={filterOptions} onFilterOptions={handlePriceFilterOptions} />
                            <Items addItemToCart={addItemToTheCart} data={items} />
                    <Support />
                </main>
                <Footer />
            </div>
    );
}

export default MainContainer;