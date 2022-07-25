import style from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SearchForm from './search_form/SearchForm';
import { SearchOptions } from '../MainContainerData';

interface Props{
    onSubmit(searchOptions: SearchOptions): void; 
    discount: string;
    red: string;
}

const Header:React.FunctionComponent<Props> = props => {

    return (
        <header>
            <div className={style.discount_banner}>
                <h2 className={style.discount_code}>LJETNA RASPRODAJA: {props.discount}</h2>
            </div>
            <div className={style.bar}>
                <div className={style.item_class}>
                    <h3 className={style.class_styling}>Tehnika</h3>
                </div>
                <h1 className={style.title}>TECH TALK</h1>
                <nav>
                    <SearchForm onSubmit={props.onSubmit}/>

                    <button 
                    className={style.cart_button}
                    >
                        <FontAwesomeIcon className={style.icon}
                        style={{
                            color: props.red==="red" ? '#cf1020' : '#7CFC00',
                        }}
                        icon={faCartShopping} />
                    </button>

                </nav>
            </div>
        </header>
    );
  }

  export default Header;