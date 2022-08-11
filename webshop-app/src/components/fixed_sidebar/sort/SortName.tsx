import React, { useEffect, useState } from "react";
import { FilterOptions } from "../filter/brand/Brand";
import style from './SortButton.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
}

const SortName:React.FunctionComponent<Props> = props => {

    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const [isActive, setIsActive] = useState<string>('ASC');

    const handleClick = (sortOrder: string) => {
        setIsActive(sortOrder);

        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                sortBy: "NAME",
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
                backgroundColor: isActive === "ASC" ? '#7CFC00' : '#20232a',
                color: isActive === "ASC" ? '#20232a' : '#7CFC00',
            }}
            onClick={() => handleClick("ASC")} 
            className={style.choose_button} >A - Z
        </button>

        <button 
            style={{
                backgroundColor: isActive === "DESC" ? '#7CFC00' : '#20232a',
                color: isActive === "DESC" ? '#20232a' : '#7CFC00',
            }}
            onClick={() => handleClick("DESC")} 
            className={style.choose_button} >Z - A
        </button>
        </>
    );
}

export default SortName;