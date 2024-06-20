import style from './Header.module.css'
import SearchForm from './search_form/SearchForm';
import { Hit } from '../MainContainerData';
import ShoppingCartButton from './shopping_cart_button/ShoppingCartButton';
import logo from '../../images/tt_logo.png'
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
                <h2 className={`${style.discount_code} u-h2 not_mobile`}>SUMMER SALE: {props.discount} for 25% OFF</h2>
                <h2 className={`${style.discount_code} u-h2 not_pocket not_desktop`}>{props.discount} for 25% OFF</h2>
            </div>
            }

            <div className={style.bar}>
                <div className={`${style.label} u-s1 not_mobile not_pocket`}>
                    House of Computers
                </div>
                <a href={`${window.location.origin}/tech`} className={style.logo}>
                    <img className={style.logo_image}  src={logo} alt=""></img>
                </a>
                
                <nav className={`${style.navigation}`}>
                    {
                    location.pathname === '/tech' &&
                    <>
                        <SearchForm/>
                        <ShoppingCartButton activeOrder={props.activeOrder} orderItems={props.orderItems}/>
                        <Link to={UserService.isAuthenticated() ? '/account' : '/login'}>
                        <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </>
                    }
                </nav>
            </div>
        </header>
    );
  }

  export default Header;