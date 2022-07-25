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

    const addToCart = () =>{
        props.addItemToCart({
            itemId: props.item.id,
            firstAdded: firstAdd
        });
        firstAdd = false;
    }

    useEffect(() => {
        BrandService.findById(props.item.brandId).then((response) => {
            setBrandName(response.data.name);
        });
    }, [props.item.brandId])

    return (
        <div className={style.item_box}>
            <img className={style.image} src={itemImg} alt='Slika proizvoda'></img>
            <h3 className={style.item_name}>{props.item.name}</h3>
            <p className={style.item_description}>Opis: {props.item.description}</p>
            <p className={style.item_brand}>Marka: {brandName}</p>
            <p className={style.item_price}>{props.item.price}kn</p>
            <button 
            className={style.cart_button}
            onClick={addToCart}>
                <FontAwesomeIcon className={style.icon} icon={faCartPlus} />
            </button>
        </div>
    );
}

export default Item;