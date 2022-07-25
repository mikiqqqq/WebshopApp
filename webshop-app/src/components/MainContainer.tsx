import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { PriceFilterOptions, SearchOptions } from "./MainContainerData";
import style from "./MainContainer.module.css"
import FixedSidebar from "./fixed_sidebar/FixedSidebar";
import Items from "./item_container/Items";
import ItemService from "../services/ItemService";

interface Props{

}

interface ItemType {
    id: number;
    name: string;
    description: string;
    price: number;
  }

const MainContainer:React.FunctionComponent<Props> = () => {

    const [items, setItems] = useState<Array<ItemType>>([]);
 
    const fetchItems = () => {
        ItemService.fetchAllItems().then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const resetItems = (reset: number) =>{
        if(reset){
            fetchItems();
        }
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

    const handleBrandFilterOptions = async (brandFilterOptions: number) => {
        findBrandById(brandFilterOptions);
        console.log(items);
    };

    const handlePriceFilterOptions = async (priceFilterOptions: PriceFilterOptions) => {
        findAllInRange(priceFilterOptions);
        console.log(items);
    };
     
    return(
        <div className="page">
            <Header onSubmit={handleSubmit}/>
                <main className={style.main}>
                <FixedSidebar 
                reset={resetItems} 
                onPriceFilterOptions={handlePriceFilterOptions}
                onBrandFilterOptions={handleBrandFilterOptions}/>
                <Items data={items}/>
                </main>
            <Footer/>
        </div>
    );
}

export default MainContainer;