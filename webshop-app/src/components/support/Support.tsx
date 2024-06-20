import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Support.module.css';
import image from '../../images/customer_support.png';

const SupportIfTech: React.FC = () => {
    const location = useLocation();
    return (
        location.pathname === '/tech' ? (
            <button className={style.support_button}>
                <img src={image} className={style.button_icon} alt="Support" />
            </button>
        ) : null
    );
};

export default React.memo(SupportIfTech);
