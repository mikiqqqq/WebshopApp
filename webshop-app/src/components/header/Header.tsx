import style from './Header.module.css'
import SearchForm from './search_form/SearchForm';
import { Hit, SearchOptions } from '../MainContainerData';
import ShoppingCart from './shopping_cart/ShoppingCart';
import logo from '../../images/tt_logo.png'

interface Props{
    onSubmit(searchOptions: SearchOptions): void; 

    orderItems: Hit[];
    activeOrder: number;
    discount: string;
    red: string;
}

const Header:React.FunctionComponent<Props> = props => {

    return (
        <header>
            <div className={style.discount_banner}>
                <h2 className={style.discount_code}>SUMMER SALE: {props.discount}</h2>
            </div>
            <div className={style.bar}>
                <div className={style.item_class}>
                    <h3 className={style.class_styling}>House of Computers</h3>
                </div>
                <img src={logo}></img>
                <nav>
                    <SearchForm onSubmit={props.onSubmit}/>

                    <ShoppingCart red={props.red} activeOrder={props.activeOrder} orderItems={props.orderItems}/>
                </nav>
            </div>
        </header>
    );
  }

  export default Header;