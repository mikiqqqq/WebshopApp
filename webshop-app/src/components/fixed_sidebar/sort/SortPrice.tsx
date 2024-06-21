import React, { useEffect, useState } from "react";
import { FilterOptions } from "../../MainContainerData";
import style from './SortButtons.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
    baseColor: string;
    backgroundColor: string;
}

const SortPrice:React.FunctionComponent<Props> = props => {

    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const [isActive, setIsActive] = useState<string>('ASC');

    const handleClick = (sortOrder: string) => {
        setIsActive(sortOrder);

        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                sortBy: "PRICE",
                sortOrder: sortOrder
            };
        })
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    return(
        <>
        <button 
            style={{
                backgroundColor: isActive === "ASC" ? props.baseColor : props.backgroundColor,
                color: isActive === "ASC" ? props.backgroundColor : props.baseColor,
            }}
            onClick={() => handleClick("ASC")} 
            className={style.choose_button} >Lowest First
        </button>

        <button 
            style={{
                backgroundColor: isActive === "DESC" ? props.baseColor : props.backgroundColor,
                color: isActive === "DESC" ? props.backgroundColor : props.baseColor,
            }}
            onClick={() => handleClick("DESC")} 
            className={style.choose_button} >Highest First
        </button>
        </>
    );
}

export default SortPrice;