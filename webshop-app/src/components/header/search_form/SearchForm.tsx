import style from './SearchForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { SearchOptions } from '../../MainContainerData';
import { useSearchParams } from 'react-router-dom';

const SearchForm:React.FunctionComponent = () => {

    const [inputValue, setInputValue] = useState<string>('');
    let [searchParams, setSearchParams] = useSearchParams();

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue((e.target as HTMLInputElement).value);
    }

    const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            setSearchParams({search: inputValue});
            event.preventDefault();
        }
      };

    return (
        <div className={style.search_bar}>
            <div className={style.search_button}>
                <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
            </div>
            <input 
            className={style.search_txt} 
            value={inputValue}
            onKeyDown={keyPressHandler}
            onChange={handleInputChange} 
            type="text" 
            placeholder="Search products" />
        </div>
    );
  }

  export default SearchForm;