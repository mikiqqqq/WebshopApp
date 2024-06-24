import React, { useEffect, useState } from "react";
import BrandService from "../../../../services/BrandService";
import style from '../FilterButtons.module.css'
import { FilterOptions, BrandType } from "../../../MainContainerData";

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
    baseColor: string;
    backgroundColor: string;
}

let myMap = new Map();

const Brand:React.FunctionComponent<Props> = props => {

    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);

    const fetchBrands = () => {
        BrandService.fetchAllBrands().then((response) => {
            setBrands(response.data);
        }).catch(() => {
            console.log("ERR_CONNECTION_REFUSED");
        });
    }

    const handleClick = (brandId: number) => {
        myMap.set(brandId, !myMap.get(brandId));
        if(myMap.get(brandId)){
            setFilterOptions((filterOptions) => {
                return {
                    ...props.filterOptions,
                    brandIds: [...filterOptions.brandIds, brandId]
                };
            })
        }else{
            setFilterOptions((filterOptions) => {
                return {
                    ...props.filterOptions,
                    brandIds: filterOptions.brandIds.filter(id => id !== brandId)
                }       
            })
        }
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    useEffect(() => {
        fetchBrands();
        brands.forEach(element => {
            myMap.set(element.id, false)
        });
    }, [])

    return(
        <>
        {brands.map(
            brand => { return(
            <button 
            style={{
                backgroundColor: myMap.get(brand.id) ? props.baseColor : '#414554',
                color: myMap.get(brand.id) ? props.backgroundColor : props.baseColor,
            }}
            onClick={() => handleClick(brand.id)} 
            className={style.brand_button} 
            key={brand.id}>{brand.title}
            </button>
        );})}
        </>
    );
}

export default Brand;