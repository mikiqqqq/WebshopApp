import React, { useEffect, useState } from 'react';
import style from './FixedSidebar.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Brand from './filter/brand/Brand';
import { FilterOptions } from "../MainContainerData";
import Type from './filter/type/Type';
import ProductionYear from './filter/production_year/ProductionYear';
import Price from './filter/price/Price';
import SortPrice from './sort/SortPrice';
import SortName from './sort/SortName';
import image from '../../images/tech.png';
import useElementaryAnimation from '../../hooks/useElementaryAnimation';

interface Props {
  onFilterOptions: (filterOptions: FilterOptions) => void;
  filterOptions: FilterOptions;
  onClearAll: () => void; // Added prop for clear all handler
  reset: boolean; // Add reset prop
}

const FixedSidebar: React.FunctionComponent<Props> = props => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
  const [sortOrderPrice, setSortOrderPrice] = useState<string>('ASC');
  const [sortOrderName, setSortOrderName] = useState<string>('ASC');
  const baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
  const backgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--background');
  useElementaryAnimation();

  const handleClick = (sortBy: string, sortOrder: string) => {
    setFilterOptions(prevFilterOptions => ({
      ...prevFilterOptions,
      sortBy: sortBy,
      sortOrder: sortOrder
    }));
  };

  useEffect(() => {
    props.onFilterOptions(filterOptions);
  }, [filterOptions]);

  const handleSortOrderChange = (sortBy: string, sortOrder: string) => {
    if (sortBy === "PRICE") {
      setSortOrderPrice(sortOrder);
    } else if (sortBy === "NAME") {
      setSortOrderName(sortOrder);
    }
    setFilterOptions(prevFilterOptions => ({
      ...prevFilterOptions,
      sortBy: sortBy,
      sortOrder: sortOrder
    }));
  };

  useEffect(() => {
    setFilterOptions(props.filterOptions);
  }, [props.filterOptions]);

  useEffect(() => {
    if (props.reset) {
      setSortOrderPrice('ASC');
      setSortOrderName('ASC');
      setFilterOptions(props.filterOptions); // Reset filter options
    }
  }, [props.reset, props.filterOptions]);

  return (
    <div className={`${style.sidebar} animated_content`} data-animation="elementFromLeft">
      <div className={style.fixed}>
        <div className={`${style.filter_title} u-h2`}>Sorting</div>
        <Accordion className={style.accordion} flush>
          <Accordion.Item className={style.accordion_item} eventKey="0">
            <Accordion.Header
              onClick={() => handleClick("PRICE", sortOrderPrice)}
              className={`${style.accordion_header} u-pb1`}
            >
              Price
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body_sort}>
              <SortPrice
                onFilterOptions={props.onFilterOptions}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                onSortOrderChange={(sortOrder) => handleSortOrderChange("PRICE", sortOrder)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className={style.accordion_item} eventKey="1">
            <Accordion.Header
              onClick={() => handleClick("NAME", sortOrderName)}
              className={`${style.accordion_header} u-pb1`}
            >
              Alphabetically
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body_sort}>
              <SortName
                onFilterOptions={props.onFilterOptions}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                onSortOrderChange={(sortOrder) => handleSortOrderChange("NAME", sortOrder)}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className={`${style.filter_title} u-h2`}>Filtering</div>
        <Accordion className={style.accordion} flush>
          <Accordion.Item className={style.accordion_item} eventKey="2">
            <Accordion.Header className={`${style.accordion_header} u-pb1`}>
              Type
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body_radio}>
              <Type
                onFilterOptions={(newFilterOptions) => setFilterOptions(newFilterOptions)}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                reset={props.reset} // Pass reset prop to Type component
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className={style.accordion_item} eventKey="3">
            <Accordion.Header className={`${style.accordion_header} u-pb1`}>
              Brand
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body}>
              <Brand
                onFilterOptions={(newFilterOptions) => setFilterOptions(newFilterOptions)}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                reset={props.reset} // Pass reset prop to Brand component
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className={style.accordion_item} eventKey="4">
            <Accordion.Header className={`${style.accordion_header} u-pb1`}>
              Price
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body_radio}>
              <Price
                onFilterOptions={(newFilterOptions) => setFilterOptions(newFilterOptions)}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                reset={props.reset} // Pass reset prop to Price component
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className={style.accordion_item} eventKey="5">
            <Accordion.Header className={`${style.accordion_header} u-pb1`}>
              Year
            </Accordion.Header>
            <Accordion.Body className={style.accordion_body_radio}>
              <ProductionYear
                onFilterOptions={(newFilterOptions) => setFilterOptions(newFilterOptions)}
                filterOptions={filterOptions}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
                reset={props.reset} // Pass reset prop to ProductionYear component
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className={style.image_container}>
          <img src={image} className={style.image} alt="Tech" />
        </div>

        <div className={style.clear_all_container}>
          <button className={`${style.clear_all_button} button_transparent u-h3`} onClick={props.onClearAll}>
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedSidebar;