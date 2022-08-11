import React, { useEffect, useState } from "react";
import style from './Item.module.css';
import itemImg from '../../../images/item.jpg'
import { AddItem, Hit } from "../../MainContainerData";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandService from "../../../services/BrandService";

interface Props {
    addItemToCart: (item: AddItem) => void;
    item: Hit;
}

let firstAdd: boolean = true;
const Item: React.FunctionComponent<Props> = props => {

    const[brandName, setBrandName] = useState<string>('');
    const[quantity, setQuantity] = useState<number>(1);
    const[disableButton, setDisableButton] = useState<boolean>(false);
    const[message, setMessage] = useState<string>('');

    const addToCart = () =>{
        props.addItemToCart({
            itemId: props.item.id,
            amount: quantity,
            firstAdded: firstAdd
        });
        firstAdd = false;
    }

    useEffect(() => {
        BrandService.findById(props.item.brandId).then((response) => {
            setBrandName(response.data.name);
        });
    }, [props.item.brandId])

    const increment = () => {
        if(quantity + 1 < props.item.amount){
            setQuantity(quantity + 1);
        }else if(quantity + 1 == props.item.amount){
            setQuantity(quantity + 1);
            setDisableButton(true);
            setMessage(' - Maxed out');
        }
    };

    const decrement = () => {
        if(quantity - 1 > 0) setQuantity(quantity - 1);
        setMessage('');
    }

    return (
        <div className={style.item_box}>
            <img className={style.image} src={itemImg} alt={props.item.name}></img>
            <h3 className={style.item_name}>{props.item.name}</h3>
            <p className={style.item_description}>{props.item.description}</p>
            <p className={style.item_brand}>{brandName}</p>
            <div className={style.hover_buttons}>
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
                <button
                    className={style.cart_button}
                    onClick={addToCart} disabled={disableButton}>
                    <FontAwesomeIcon className={style.icon} icon={faCartPlus}/>
                </button>
            </div>
            <strong className={style.item_price}>${props.item.price}</strong>
        </div>
    );
}

export default Item;