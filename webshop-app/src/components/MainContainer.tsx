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

interface Props{

}

interface OrderItemAndAmount{
    id: number;
    quantity: number;
}
var orderItemAndAmount = new Array<OrderItemAndAmount>();

var orderId: number = 0;
const MainContainer:React.FunctionComponent<Props> = () => {

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
 
    const fetchItems = () => {
        ItemService.fetchAllItems().then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        fetchItems();
        fetchActiveDiscountCode();
    }, []);

    useEffect(() => {
        ItemService.filterItems(filterOptions).then((response) => {
            setItems(response.data);
        });
    }, [filterOptions]);

    const fetchActiveDiscountCode = () => {
        DiscounCodeService.fetchActiveDiscountCode().then((response) => {
            setDiscountCode(response.data.code);
        });
    }

    const fetchItemsContainingTarget = (searchOptions: SearchOptions) => {
        ItemService.findAllThatContainTarget(searchOptions.search).then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    const handleSubmit = async (searchOptions: SearchOptions) => {
        fetchItemsContainingTarget(searchOptions);
        console.log(items);
    };


    const handlePriceFilterOptions = async (filterOptions: FilterOptions) => {
        setFilterOptions(filterOptions);
    };


    const addItemToTheCart = async (item: AddItem) => {
        if(item.firstAdded){
            OrderService.createOrder(new Date().toLocaleDateString('hr-HR'));
            orderId++;
            setActiveOrder(orderId);
            changeColor('red');
        }
        for(let i = 0; i < item.amount; i++){
            OrderItemService.createOrderItem(orderId, item.itemId);
        }
        if(orderId !== 0){     
              OrderItemService.getOrderItemAmount(orderId).then((response) => {
                orderItemAndAmount = response.data;
              });
              if(orderItemAndAmount.length !== 0){
                ItemService.findItemByItemId(orderItemAndAmount.map(item => item.id)).then((response) => {
                  setOrderItems(response.data);
                });
              }
              setOrderItems(orderItems.map(item => 
                ({ ...item, ...orderItemAndAmount.find(orderItem => orderItem.id === item.id) }))
              );
              console.log('done');
          }
        console.log(orderItems);
    }

    return(
        <div className={style.page}>
            <Header onSubmit={handleSubmit} discount={discountCode} red={color} activeOrder={activeOrder} orderItems={orderItems}/>
                <main className={style.main}>
                <FixedSidebar filterOptions={filterOptions} onFilterOptions={handlePriceFilterOptions}/>
                <Items addItemToCart={addItemToTheCart} data={items}/>
                </main>
            <Footer/>
        </div>
    );
}

export default MainContainer;