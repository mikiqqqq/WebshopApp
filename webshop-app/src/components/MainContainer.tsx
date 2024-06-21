import React, { useEffect, useState } from "react";
import { AddProduct, Product } from "./MainContainerData";
import style from "./MainContainer.module.css"
import FixedSidebar from "./fixed_sidebar/FixedSidebar";
import Items from "./item_container/Items";
import ItemService from "../services/ItemService";
import { FilterOptions } from "./MainContainerData";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


interface Props{
    addItemToCart: (item: AddProduct) => void;
}

const MainContainer:React.FunctionComponent<Props> = props => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState<Array<Product>>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        brandIds: [] as number[],
        uprLmt: 5000,
        lwrLmt: 0,
        productTypeId: 0,
        productionYear: 0,
        sortBy: "NAME",
        sortOrder: "ASC"
    })
    const [rotate, setRotate] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(true);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue((e.target as HTMLInputElement).value);
    }

    const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            setSearchParams({search: inputValue});
            event.preventDefault();
        }
    };

    const blink = () => {
        setRotate(true);
        const timeoutID = setTimeout(() => {
            setRotate(false);
        }, 2500);
        return () => clearTimeout(timeoutID);
    }

    useEffect(() => {
        setInterval(blink, 10000);
    }, [])

    useEffect(() => {
        if(searchParams.get('search') === null){
                ItemService.filterItems(filterOptions).then((response) => {
                    setItems(response.data);
                    console.log(response.data);
                    setError(false);
                }).catch(() => {
                    setError(true);
                });
        }else{
            setError(false);
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
            
            {
            error &&
            <div className={style.no_items}>
                <h2 id={style.network_error}>NETWORK ERROR</h2>
                <h2>Something went wrong... Please try again later.</h2>
                <FontAwesomeIcon icon={faFaceSadTear} style={{transform: rotate ? 'scaleX(-1)' : 'scaleX(1)'}} className={style.frown_face}/>
            </div>
            }

            {
            items.length == 0 && !error ?
            <div className={style.no_items}>
                <h2>Unfortunately, your search for "{searchParams.get('search')}" returned no results...</h2>
                <h2>Try again using a different term</h2>
                <div className={style.search_container}>
                    <input
                    type="text" 
                    placeholder="Search products" 
                    className={style.search_bar}
                    value={inputValue}
                    onKeyDown={keyPressHandler}
                    onChange={handleInputChange}/>
                    <button className={style.search_button}>
                        <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
                    </button>
                </div>
                <FontAwesomeIcon icon={faFaceSadTear} style={{transform: rotate ? 'scaleX(-1)' : 'scaleX(1)'}} className={style.frown_face}/>
            </div>
            :
            <Items addItemToCart={props.addItemToCart} data={items} />
            }
            
        </main>
    );
}

export default MainContainer;