import style from './Header.module.css'
import SearchForm from './search_form/SearchForm';
import { Hit } from '../MainContainerData';
import ShoppingCartButton from './shopping_cart_button/ShoppingCartButton';
import logo from '../../images/tt_logo.png'
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

interface Props{
    orderItems: Hit[];
    activeOrder: number;
    discount: string;
    error: boolean;
}

const Header:React.FunctionComponent<Props> = props => {
    const [headerColor, setHeaderColor] = useState("#00ced1");
    const location = useLocation();

    const blink = () => {
        setHeaderColor('#00e0e3');
        const timeoutID = setTimeout(() => {
            setHeaderColor('#00ced1');
            const timeoutID2 = setTimeout(() => {
                setHeaderColor('#00e0e3');
                const timeoutID3 = setTimeout(() => {
                    setHeaderColor('#00ced1');
                }, 150);
                return () => clearTimeout(timeoutID3);
            }, 150);
            return () => clearTimeout(timeoutID2);
        }, 150);
        return () => clearTimeout(timeoutID);
    }

    useEffect(() => {
        setInterval(blink, 5000);
    }, [])

    return (
        <header>
            {
            !props.error && props.discount !== undefined &&
            
            <div className={style.discount_banner} style={{backgroundColor: headerColor}}>
                <h2 className={style.discount_code}>SUMMER SALE: {props.discount} for 25% OFF</h2>
            </div>
            }

            <div className={style.bar}>
                <div className={style.item_class}>
                    <h3 className={style.class_styling}>House of Computers</h3>
                </div>
                <img src={logo}></img>
                
                <nav>
                    {
                    location.pathname === '/tech' &&
                    <>
                        <SearchForm/>
                        <ShoppingCartButton activeOrder={props.activeOrder} orderItems={props.orderItems}/>
                    </>
                    }
                </nav>
            </div>
        </header>
    );
  }

  export default Header;