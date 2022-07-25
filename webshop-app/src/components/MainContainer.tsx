import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { PriceFilterOptions, SearchOptions, AddItem } from "./MainContainerData";
import style from "./MainContainer.module.css"
import FixedSidebar from "./fixed_sidebar/FixedSidebar";
import Items from "./item_container/Items";
import ItemService from "../services/ItemService";
import DiscounCodeService from "../services/DiscountCodeService";
import OrderService from "../services/OrderService";
import OrderItemService from "../services/OrderItemService";

interface Props{

}

interface ItemType {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
  }

const MainContainer:React.FunctionComponent<Props> = () => {

    const [items, setItems] = useState<Array<ItemType>>([]);
    const [discountCode, setDiscountCode] = useState<string>('');
 
    const fetchItems = () => {
        ItemService.fetchAllItems().then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchActiveDiscountCode = () => {
        DiscounCodeService.fetchActiveDiscountCode().then((response) => {
            setDiscountCode(response.data.code);
            console.log(response.data);
        });
    }

    useEffect(() => {
        fetchActiveDiscountCode();
    }, []);

    const fetchItemsContainingTarget = (searchOptions: SearchOptions) => {
        ItemService.findAllThatContainTarget(searchOptions.search).then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    const findBrandById = (brandFilterOptions: number) => {
        ItemService.findItemByBrandId(brandFilterOptions).then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    const findAllInRange = (priceFilterOptions: PriceFilterOptions) => {
        ItemService.findAllInPriceRange(priceFilterOptions.upperLimit, priceFilterOptions.lowerLimit).then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    const resetItems = (reset: number) =>{
        if(reset){
            fetchItems();
        }
    }

    const handleSubmit = async (searchOptions: SearchOptions) => {
        fetchItemsContainingTarget(searchOptions);
        console.log(items);
    };

    const handleBrandFilterOptions = async (brandFilterOptions: number) => {
        findBrandById(brandFilterOptions);
    };

    const handlePriceFilterOptions = async (priceFilterOptions: PriceFilterOptions) => {
        findAllInRange(priceFilterOptions);
    };
     

    const[color, changeColor] = useState<string>('');

    let orderId: number = 0;
    const addItemToTheCart = async (item: AddItem) => {
        console.log(item.firstAdded);
        if(item.firstAdded){
            OrderService.createOrder(new Date().toLocaleDateString('hr-HR'));
            orderId++;
            changeColor('red');
        }
        OrderItemService.createOrderItem(orderId, item.itemId);

    }

    return(
        <div className="page">
            <Header onSubmit={handleSubmit} discount={discountCode} red={color}/>
                <main className={style.main}>
                <FixedSidebar 
                reset={resetItems} 
                onPriceFilterOptions={handlePriceFilterOptions}
                onBrandFilterOptions={handleBrandFilterOptions}/>
                <Items addItemToCart={addItemToTheCart} data={items}/>
                </main>
            <Footer/>
        </div>
    );
}

export default MainContainer;