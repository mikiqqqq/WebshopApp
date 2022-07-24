import style from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Header() {

    return (
        <header>
            <div className={style.discount_banner}>
                <h2 className={style.discount_code}>XXXX-XXXX-XXXX-XXXX</h2>
            </div>
            <div className={style.bar}>
                <div className={style.item_class}>
                    <h3 className={style.class_styling}>Tehnika</h3>
                </div>
                <h1 className={style.title}>TECH KING</h1>
                <nav>
                    <div className={style.search_bar}>
                        <div className={style.search_button}>
                             <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
                        </div>
                        <input className={style.search_txt} type="text" placeholder="Pretraži proizvode" />
                    </div>
                    
                    <button className={style.cart_button}>
                        <FontAwesomeIcon className={style.icon} icon={faCartShopping} />
                    </button>
                </nav>
            </div>
        </header>
    );
  }