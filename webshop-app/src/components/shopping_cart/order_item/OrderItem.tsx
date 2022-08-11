import React, { useEffect, useState } from "react";
import { Hit } from "../../MainContainerData";
import style from "./OrderItem.module.css";
import itemImg from '../../../images/item.jpg';
import BrandService from "../../../services/BrandService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


interface Props{
    orderItem: Hit;
}

const OrderItem:React.FunctionComponent<Props> = props => {
    const[brandName, setBrandName] = useState<string>('');
    const[quantity, setQuantity] = useState<number>(props.orderItem.quantity);
    const[message, setMessage] = useState<string>('');

    useEffect(() => {
        BrandService.findById(props.orderItem.brandId).then((response) => {
            setBrandName(response.data.name);
        });
    }, [props.orderItem.brandId])

    const increment = () => {
        if(quantity + 1 < props.orderItem.amount){
            setQuantity(quantity + 1);
        }else if(quantity + 1 == props.orderItem.amount){
            setQuantity(quantity + 1);
            setMessage(' - Maxed out');
        }
    };

    const decrement = () => {
        if(quantity - 1 > 0) setQuantity(quantity - 1);
        setMessage('');
    }

    return(
        <div className={style.cart_item} key={props.orderItem.id}>
            <img src={itemImg} alt={props.orderItem.name} />
            <div className={style.cart_item_body}>
                <h5>{props.orderItem.name}</h5>
                <h3>{brandName}</h3>
                <div className={style.quantity_counter}>
                    <button className={`${style.quantity_button} ${style.quantity_button_decrement}`} 
                    onClick={decrement}>
                        <p>-</p>
                    </button>
                    <p className={style.quantity_display}>{quantity}{message}</p>
                    <button className={`${style.quantity_button} ${style.quantity_button_increment}`} onClick={increment}>
                        <p>+</p>
                    </button>
                </div>
                <button className={style.remove_button}>
                    <FontAwesomeIcon icon={faClose} className={style.icon}/>&nbsp;&nbsp;&nbsp;Remove
                </button>
                <strong id={style.item_price}>${props.orderItem.quantity * props.orderItem.price}</strong>
            </div>
        </div>
    );
}

export default OrderItem;