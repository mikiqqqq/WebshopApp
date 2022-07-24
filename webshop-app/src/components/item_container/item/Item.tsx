import React, { useEffect, useState } from "react";
import ItemService from "../../../services/ItemService";
import style from './Item.module.css'
import itemImg from '../../../images/item.jpg'

interface Props{

}

interface ItemType {
    id: number;
    name: string;
    description: string;
    price: number;
  }

const Item:React.FunctionComponent<Props> = () => {

    const [items, setItems] = useState<Array<ItemType>>([]);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        ItemService.fetchAllItems().then((response) => {
            setItems(response.data);
            console.log(response.data);
        });
    }

    return(
        <>
        {items.map(
            item => { return(
            <div className={style.item_box} key={item.id}>
                <img className={style.image} src={itemImg} alt='Slika proizvoda'></img>
                <h3>{item.name}</h3>
                <p>Opis: {item.description}</p>
                <p>Cijena: {item.price}</p>
            </div>
        );})}
        </>
    );
}

export default Item;