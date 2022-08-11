import React from 'react';
import style from './Support.module.css';
import image from '../../images/customer_support.png'

const Support:React.FunctionComponent = () => {
    return (
        <button className={style.support_button} >
            <img src={image} className={style.button_icon}></img>
        </button>
    );
}

export default React.memo(Support);