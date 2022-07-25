import React, { useEffect, useState } from "react";
import BrandService from "../../../services/BrandService";
import style from './Brand.module.css'

interface Props{
    onBrandFilterOptions: (brandFilterOptions: number) => void;
    reset: (reset: number) => void;
}

interface BrandType {
    id: number;
    name: string;
}

const Brand:React.FunctionComponent<Props> = props => {

    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [toggleId, setToggleId] = useState<number>();

    const fetchBrands = () => {
        BrandService.fetchAllBrands().then((response) => {
            setBrands(response.data);
            console.log(response.data);
        });
    }

    const handleClick = (id:number) => {
        setIsActive(current => !current);
        if(!isActive){
            setToggleId(id);
            console.log(isActive);
            props.onBrandFilterOptions(id); 
        }else{
            props.reset(1);
        }
    }

    useEffect(() => {
        fetchBrands();
    }, [])

    return(
        <>
        {brands.map(
            brand => { return(
            <button 
            style={{
                backgroundColor: toggleId===brand.id && isActive ? '#656a75' : '#7CFC00',
                color: toggleId===brand.id && isActive ? '#7CFC00' : '#20232a',
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