import React, { useEffect, useState } from "react";
import { FilterOptions } from "../../../MainContainerData";
import style from '../FilterButtons.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
    baseColor: string;
    backgroundColor: string;
}

const priceArray = [
    [0, 100],
    [100, 500],
    [500, 1000],
    [1000, 2000],
    [2000, 5000],
]
const Price:React.FunctionComponent<Props> = props => {

    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const [isActive, setIsActive] = useState<Array<number>>([0, 5000]);

    const handleClick = (price: Array<number>) => {
        setIsActive(price);

        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                lwrLmt: price[0],
                uprLmt: price[1]
            };
        })
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    return(
        <>
        {priceArray.map(
            priceOption => { return(
            <button 
            style={{
                backgroundColor: isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? props.baseColor : props.backgroundColor,
                color: isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? props.backgroundColor : props.baseColor,
            }}
            onClick={() => handleClick([priceOption[0], priceOption[1]])} 
            className={style.choose_button} 
            key={priceOption[0]}>{priceOption[0]}$ - {priceOption[1]}$
            </button>
        );})}

        <button 
            style={{
                backgroundColor: isActive[0] === 0 && isActive[1] === 5000 ? props.baseColor : props.backgroundColor,
                color: isActive[0] === 0 && isActive[1] === 5000  ? props.backgroundColor : props.baseColor,
            }}
            onClick={() => handleClick([0, 5000])} 
            className={style.choose_button} >No Filter
        </button>
        </>
    );
}

export default Price;