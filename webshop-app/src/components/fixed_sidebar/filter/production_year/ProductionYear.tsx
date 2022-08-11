import React, { useEffect, useState } from "react";
import { FilterOptions } from "../brand/Brand";
import style from './ProductionYear.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
}

const productionYears = [2022, 2021, 2020, 2019, 2018];
const ProductionYear:React.FunctionComponent<Props> = props => {

    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const [isActive, setIsActive] = useState<number>(0);

    const handleClick = (year: number) => {
        setIsActive(year);

        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                productionYear: year
            };
        })
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    return(
        <>
        {productionYears.map(
            year => { return(
            <button 
            style={{
                backgroundColor: isActive === year ? '#7CFC00' : '#20232a',
                color: isActive === year ? '#20232a' : '#7CFC00',
            }}
            onClick={() => handleClick(year)} 
            className={style.choose_button} 
            key={year}>{year}
            </button>
        );})}

        <button 
            style={{
                backgroundColor: isActive === 0 ? '#7CFC00' : '#20232a',
                color: isActive === 0 ? '#20232a' : '#7CFC00',
            }}
            onClick={() => handleClick(0)} 
            className={style.choose_button} >No Filter
        </button>
        </>
    );
}

export default ProductionYear;