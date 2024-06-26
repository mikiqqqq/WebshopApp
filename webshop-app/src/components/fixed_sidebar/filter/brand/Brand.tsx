import React, { useEffect, useState } from "react";
import BrandService from "../../../../services/BrandService";
import style from '../FilterButtons.module.css';
import { FilterOptions, BrandType } from "../../../MainContainerData";

interface Props {
  onFilterOptions: (filterOptions: FilterOptions) => void;
  filterOptions: FilterOptions;
  baseColor: string;
  backgroundColor: string;
  reset: boolean; // Add reset prop
}

const Brand: React.FunctionComponent<Props> = props => {
  const [brands, setBrands] = useState<Array<BrandType>>([]);
  const [selectedBrands, setSelectedBrands] = useState<Set<number>>(new Set(props.filterOptions.brandIds));

  const fetchBrands = () => {
    BrandService.fetchAllBrands().then((response) => {
      setBrands(response.data);
    }).catch(() => {
      console.log("ERR_CONNECTION_REFUSED");
    });
  };

  const handleClick = (brandId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const newSelectedBrands = new Set(selectedBrands);
    if (newSelectedBrands.has(brandId)) {
      newSelectedBrands.delete(brandId);
    } else {
      newSelectedBrands.add(brandId);
    }
    setSelectedBrands(newSelectedBrands);
    props.onFilterOptions({
      ...props.filterOptions,
      brandIds: Array.from(newSelectedBrands)
    });
    event.currentTarget.blur(); // Remove focus from the button after click
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (props.reset) {
      setSelectedBrands(new Set()); // Reset selected brands
    }
  }, [props.reset]);

  return (
    <>
      {brands.map(brand => (
        <button 
          style={{
            backgroundColor: selectedBrands.has(brand.id) ? props.baseColor : '#414554',
            color: selectedBrands.has(brand.id) ? props.backgroundColor : props.baseColor
          }}
          onClick={(e) => handleClick(brand.id, e)} 
          className={style.brand_button} 
          key={brand.id}
        >
          {brand.title}
        </button>
      ))}
    </>
  );
};

export default Brand;