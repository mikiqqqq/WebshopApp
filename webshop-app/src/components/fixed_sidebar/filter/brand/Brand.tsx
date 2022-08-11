import React, { useEffect, useState } from "react";
import BrandService from "../../../../services/BrandService";
import style from './Brand.module.css'

interface Props{
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
}

interface BrandType {
    id: number;
    name: string;
}

export interface FilterOptions {
    brandIds: number[];
    uprLmt: number;
    lwrLmt: number;
    productTypeId: number;
    productionYear: number;
    sortBy: string;
    sortOrder: string;
}

var myMap = new Map();

const Brand:React.FunctionComponent<Props> = props => {

    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);

    const fetchBrands = () => {
        BrandService.fetchAllBrands().then((response) => {
            setBrands(response.data);
        });
    }

    const handleClick = (brandId: number) => {
        myMap.set(brandId, !myMap.get(brandId));
        if(myMap.get(brandId)){
            setFilterOptions((filterOptions: FilterOptions) => {
                return {
                    ...props.filterOptions,
                    brandIds: [...filterOptions.brandIds, brandId]
                };
            })
        }else{
            setFilterOptions((filterOptions: FilterOptions) => {
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
                backgroundColor: myMap.get(brand.id) ? '#656a75' : '#7CFC00',
                color: myMap.get(brand.id) ? '#7CFC00' : '#20232a',
            }}
            onClick={() => handleClick(brand.id)} 
            className={style.brand_button} 
            key={brand.id}>{brand.name}
            </button>
        );})}
        </>
    );
}

export default Brand;