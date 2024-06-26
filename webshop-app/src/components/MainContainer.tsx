import React, { useState } from "react";
import { Product } from "./MainContainerData";
import style from "./MainContainer.module.css";
import Items from "./item_container/Items";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Props {
  items: Product[];
  error: boolean;
}

const MainContainer: React.FC<Props> = ({ items, error }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      setSearchParams({ search: inputValue });
      event.preventDefault();
    }
  };

  return (
    <main className={style.main}>
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
          {searchParams.get('search') !== null ? (
            <div>
              <div className={`u-h1`}>Unfortunately, your search for <br />"{searchParams.get('search')}"<br /> returned no results...</div>
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
                <button className={`${style.clear_all} button_transparent u-h3`} onClick={() => setSearchParams({})}>
                  Clear search
                </button>
              </div>
              <FontAwesomeIcon
                icon={faFaceSadTear}
                className={`${style.frown_face} ${style.flip_animation}`}
              />
            </div>
          ) : (
            <div>
              <div className={`${style.not_found} u-h1`}>Unfortunately, there are no products with such filters...</div>
              <button className={`${style.clear_all} button_transparent u-h3`} onClick={() => setSearchParams({})}>
                Clear all
              </button>
              <FontAwesomeIcon
                icon={faFaceSadTear}
                className={`${style.frown_face} ${style.flip_animation}`}
              />
            </div>
          )}
        </div>
      )}

      {!error && items.length > 0 && <Items data={items} />}
    </main>
  );
};

export default MainContainer;       