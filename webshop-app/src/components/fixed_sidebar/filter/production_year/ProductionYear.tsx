import React, { useEffect, useState } from "react";
import { FilterOptions } from "../../../MainContainerData";
import style from '../FilterButtons.module.css';

interface Props {
  onFilterOptions: (filterOptions: FilterOptions) => void;
  filterOptions: FilterOptions;
  baseColor: string;
  backgroundColor: string;
  reset: boolean; // Add reset prop
}

const productionYears = [2022, 2021, 2020, 2019, 2018];
const ProductionYear: React.FunctionComponent<Props> = props => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
  const [isActive, setIsActive] = useState<number>(0);

  const handleClick = (year: number) => {
    setIsActive(year);
    setFilterOptions(() => {
      return {
        ...props.filterOptions,
        productionYear: year
      };
    });
  };

  useEffect(() => {
    props.onFilterOptions(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    if (props.reset) {
      setIsActive(0); // Reset active year
    }
  }, [props.reset]);

  return (
    <>
      {productionYears.map(year => (
        <button 
          style={{
            backgroundColor: isActive === year ? props.baseColor : props.backgroundColor,
            color: isActive === year ? props.backgroundColor : props.baseColor,
            fontWeight: isActive === year ? "bold" : ""
          }}
          onClick={() => handleClick(year)} 
          className={`${style.choose_button} ${isActive === year ? style.selected : ""}`} 
          key={year}
        >
          {year}
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

export default ProductionYear;