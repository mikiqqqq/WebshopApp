import React, { useEffect, useState } from "react";
import ProductTypeService from "../../../../services/ProductTypeService";
import { FilterOptions } from "../brand/Brand";
import style from './Type.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
}

interface ProductType{
    id: number;
    name: string;
}

const Type:React.FunctionComponent<Props> = props => {

    const [productType, setProductType] = useState<Array<ProductType>>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const [isActive, setIsActive] = useState<number>(0);

    const fetchProductTypes = () => {
        ProductTypeService.fetchAllProductTypes().then((response) => {
            setProductType(response.data);
        });
    }

    const handleClick = (productTypeId: number) => {
        setIsActive(productTypeId);

        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                productTypeId: productTypeId
            };
        })
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    useEffect(() => {
        fetchProductTypes();
    }, [])

    return(
        <>
        {productType.map(
            type => { return(
            <button 
            style={{
                backgroundColor: isActive === type.id ? '#7CFC00' : '#20232a',
                color: isActive === type.id ? '#20232a' : '#7CFC00',
            }}
            onClick={() => handleClick(type.id)} 
            className={style.choose_button} 
            key={type.id}>{type.name}
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

export default Type;