import React, { useEffect, useState } from "react";
import ProductTypeService from "../../../../services/ProductTypeService";
import { FilterOptions } from "../../../MainContainerData";
import style from '../FilterButtons.module.css';
import { ProductType } from "../../../MainContainerData";

interface Props {
  onFilterOptions: (filterOptions: FilterOptions) => void;
  filterOptions: FilterOptions;
  baseColor: string;
  backgroundColor: string;
  reset: boolean; // Add reset prop
}

const Type: React.FunctionComponent<Props> = props => {
  const [productType, setProductType] = useState<Array<ProductType>>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
  const [isActive, setIsActive] = useState<number>(0);

  const fetchProductTypes = () => {
    ProductTypeService.fetchAllProductTypes().then((response) => {
      setProductType(response.data);
    }).catch(() => {
      console.log("ERR_CONNECTION_REFUSED");
    });
  };

  const handleClick = (productTypeId: number) => {
    setIsActive(productTypeId);
    setFilterOptions(() => {
      return {
        ...props.filterOptions,
        productTypeId: productTypeId
      };
    });
  };

  useEffect(() => {
    props.onFilterOptions(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (props.reset) {
      setIsActive(0); // Reset active product type
    }
  }, [props.reset]);

  return (
    <>
      {productType.map(type => (
        <button
          style={{
            backgroundColor: isActive === type.id ? props.baseColor : props.backgroundColor,
            color: isActive === type.id ? props.backgroundColor : props.baseColor,
            fontWeight: isActive === type.id ? "bold" : ""
          }}
          onClick={() => handleClick(type.id)}
          className={`${style.choose_button} ${isActive === type.id ? style.selected : ""}`}
          key={type.id}
        >
          {type.title}
        </button>
      ))}

      <button
        style={{
          backgroundColor: isActive === 0 ? props.baseColor : props.backgroundColor,
          color: isActive === 0 ? props.backgroundColor : props.baseColor,
          fontWeight: isActive === 0 ? "bold" : ""
        }}
        onClick={() => handleClick(0)}
        className={`${style.choose_button} ${isActive === 0 ? style.selected : ""}`}
      >
        No Filter
      </button>
    </>
  );
};

export default Type;