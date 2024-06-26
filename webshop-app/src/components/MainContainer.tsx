import React, { useEffect, useState } from "react";
import { Product } from "./MainContainerData";
import style from "./MainContainer.module.css";
import FixedSidebar from "./fixed_sidebar/FixedSidebar";
import Items from "./item_container/Items";
import ItemService from "../services/ItemService";
import { FilterOptions } from "./MainContainerData";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MainContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<Array<Product>>([]);
  const defaultFilterOptions: FilterOptions = {
    brandIds: [],
    uprLmt: 15000,
    lwrLmt: 0,
    productTypeId: 0,
    productionYear: 0,
    sortBy: "NAME",
    sortOrder: "ASC"
  }
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(true);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      setSearchParams({ search: inputValue });
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (searchParams.get('search') === null) {
      ItemService.filterItems(filterOptions).then((response) => {
        setItems(response.data);
        setError(false);
      }).catch(() => setError(true));
    } else {
      setError(false);
      const target = searchParams.get('search') || " ";
      fetchItemsContainingTarget(target);
    }
  }, [searchParams, filterOptions]);
  const fetchItemsContainingTarget = (searchOptions: string) => {
    ItemService.findAllThatContainTarget(searchOptions).then((response) => {
      setItems(response.data);
    });
  };

  const handlePriceFilterOptions = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  return (
    <main className={style.main}>
      <FixedSidebar filterOptions={filterOptions} onFilterOptions={handlePriceFilterOptions} />

      {error && (
        <div className={style.no_items}>
          <div className={`u-h1`} id={style.network_error}>NETWORK ERROR</div>
          <div className={`u-h3`}>Something went wrong... Please try again later.</div>
          <FontAwesomeIcon
            icon={faFaceSadTear}
            className={`${style.frown_face} ${style.flip_animation}`}
          />
        </div>
      )}

      {!error && items.length === 0 && (
        <div className={style.no_items}>
          {searchParams.get('search') !== null ?
          <div>
          <div className={`u-h1`}>Unfortunately, your search for <br></br>"{searchParams.get('search')}"<br></br> returned no results...</div>
          <div>
            <div className={`${style.retry} u-h3`}>Try again using a different term</div>
            <div className={`${style.search_container}`}>
              <input
                type="text"
                placeholder="Search products"
                className={style.search_bar}
                value={inputValue}
                onKeyDown={keyPressHandler}
                onChange={handleInputChange}
              />  
              <button className={style.search_button} onClick={() => setSearchParams({ search: inputValue })}>
                <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
              </button>
            </div>
            <div className={`${style.or} u-h3`}>or</div>
            <button className={`${style.clear_all} button_transparent u-h3`} onClick={() => setSearchParams()}>
              Clear search
            </button>  
          </div>
          <FontAwesomeIcon
            icon={faFaceSadTear}
            className={`${style.frown_face} ${style.flip_animation}`}
          />
          </div>
          :
          <div>
            <div className={`${style.not_found} u-h1`}>Unfortunately, there are no products with such filters...</div>
            <button className={`${style.clear_all} button_transparent u-h3`} onClick={() => setSearchParams()}>
              Clear all
            </button>        
            <FontAwesomeIcon
              icon={faFaceSadTear}
              className={`${style.frown_face} ${style.flip_animation}`}
            />
          </div>
          }
        </div>
      )}

      {!error && items.length > 0 && <Items data={items} />}
    </main>
  );
};

export default MainContainer;