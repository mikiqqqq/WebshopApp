import style from './SearchForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchForm: React.FunctionComponent = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1025);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const searchButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;
    const searchBarRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue((e.target as HTMLInputElement).value);
    };

    const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            setSearchParams({ search: inputValue });
            event.preventDefault();
        }
    };

    const handleMouseEnter = () => {
        inputRef.current.focus();
    };

    const handleMouseLeave = () => {
        inputRef.current.blur();
    };

    return (
        <div className={`${style.search_bar} not_mobile not_pocket ${isSelected ? style.selected : ''}`} ref={searchBarRef}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}>
            <button 
                className={style.search_button} 
                ref={searchButtonRef} 
            >
                <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
            </button>
            <input 
                value={inputValue}
                onKeyDown={keyPressHandler}
                onChange={handleInputChange} 
                type="text" 
                className={`${style.search_txt} u-p1`}
                placeholder="Search products" 
                ref={inputRef}
            />
        </div>
    );
};

export default SearchForm;
