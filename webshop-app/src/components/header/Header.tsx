import React, { useEffect, useState } from 'react';
import style from './Header.module.css';
import SearchForm from './search_form/SearchForm';
import ShoppingCartButton from './shopping_cart_button/ShoppingCartButton';
import logo from '../../images/tt_logo.png';
import UserService from '../../services/UserService';
import DiscountCodeService from '../../services/DiscountCodeService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [headerColor, setHeaderColor] = useState("#00ced1");
  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState(false);

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
  };

  useEffect(() => {
    setInterval(blink, 5000);

    DiscountCodeService.fetchActiveDiscountCode()
    .then((response) => {
      setDiscountCode(response.data.code);
      setError(false);
    })
    .catch(() => {
      setError(true);
    });
  }, []);

  return (
    <header>
      {!error && discountCode && (
        <div className={style.discount_banner} style={{ backgroundColor: headerColor }}>
          <div className={`${style.discount_code} u-h3 not_mobile`}>SUMMER SALE: {discountCode} for 25% OFF</div>
          <div className={`${style.discount_code} u-h3 not_pocket not_desktop`}>{discountCode} for 25% OFF</div>
        </div>
      )}

      <div className={style.bar}>
        <div className={`${style.label} u-s1 not_mobile not_pocket`}>
          House of Computers
        </div>

        <Link to="/" className={style.logo}>
          <img className={style.logo_image} src={logo} alt=""></img>
        </Link>

        <nav className={`${style.navigation}`}>
          <>
            <SearchForm />
            <ShoppingCartButton />
            <Link to={UserService.isAuthenticated() ? '/account' : '/login'}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </>
        </nav>
      </div>
    </header>
  );
}

export default Header;