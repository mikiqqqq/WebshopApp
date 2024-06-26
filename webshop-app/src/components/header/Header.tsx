import React, { useEffect, useState } from 'react';
import style from './Header.module.css';
import SearchForm from './search_form/SearchForm';
import ShoppingCartButton from './shopping_cart_button/ShoppingCartButton';
import logo from '../../images/tt_logo.png';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useElementaryAnimation from '../../hooks/useElementaryAnimation';

const Header: React.FC = () => {
  useElementaryAnimation();

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setScrollDirection('up');
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  return (
    <header className={`animated_content`} data-animation="elementFromTop">
      <div className={`${style.bar} ${scrollDirection === 'down' ? style.hide : style.show}`}>
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
            <Link className={style.account_button} to={UserService.isAuthenticated() ? '/account' : '/login'}>
              <FontAwesomeIcon icon={faUser} className={style.account_icon} />
            </Link>
          </>
        </nav>
      </div>
    </header>
  );
}

export default Header;