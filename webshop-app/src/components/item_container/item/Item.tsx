import React from "react";
import style from './Item.module.css';
import itemImg from '../../../images/item.jpg'
import { Hit } from "../../ResponseItemsData";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    item: Hit;
}

const Item: React.FunctionComponent<Props> = props => {

    return (
        <div className={style.item_box}>
            <img className={style.image} src={itemImg} alt='Slika proizvoda'></img>
            <h3 className={style.item_name}>{props.item.name}</h3>
            <p className={style.item_description}>Opis: {props.item.description}</p>
            <p className={style.item_price}>{props.item.price}kn</p>
            <button className={style.cart_button}>
                <FontAwesomeIcon className={style.icon} icon={faCartPlus} />
            </button>
        </div>
    );
}

export default Item;