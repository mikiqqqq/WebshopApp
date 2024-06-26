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

const priceArray = [
  [0, 100],
  [100, 500],
  [500, 1000],
  [1000, 2000],
  [2000, 20000],
];

const Price: React.FunctionComponent<Props> = props => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
  const [isActive, setIsActive] = useState<Array<number>>([0, 20000]);

  const handleClick = (price: Array<number>) => {
    setIsActive(price);
    setFilterOptions(() => {
      return {
        ...props.filterOptions,
        lwrLmt: price[0],
        uprLmt: price[1]
      };
    });
  };

  useEffect(() => {
    props.onFilterOptions(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    if (props.reset) {
      setIsActive([0, 20000]); // Reset active price range
    }
  }, [props.reset]);

  return (
    <>
      {priceArray.map(priceOption => (
        <button
          style={{
            backgroundColor: isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? props.baseColor : props.backgroundColor,
            color: isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? props.backgroundColor : props.baseColor,
            fontWeight: isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? "bold" : ""
          }}
          onClick={() => handleClick(priceOption)}
          className={`${style.choose_button} ${isActive[0] === priceOption[0] && isActive[1] === priceOption[1] ? style.selected : ""}`}
          key={priceOption[0]}
        >
          {priceOption[0]}$ - {priceOption[1]}$
        </button>
      ))}

      <button
        style={{
          backgroundColor: isActive[0] === 0 && isActive[1] === 20000 ? props.baseColor : props.backgroundColor,
          color: isActive[0] === 0 && isActive[1] === 20000 ? props.backgroundColor : props.baseColor,
          fontWeight: isActive[0] === 0 && isActive[1] === 20000 ? "bold" : ""
        }}
        onClick={() => handleClick([0, 20000])}
        className={`${style.choose_button} ${isActive[0] === 0 && isActive[1] === 20000 ? style.selected : ""}`}
      >
        No Filter
      </button>
    </>
  );
};

export default Price;