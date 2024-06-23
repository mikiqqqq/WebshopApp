import React from 'react';
import { AddProduct, Product } from '../MainContainerData';
import style from './Items.module.css';
import Item from './item/Item';

interface Props {
  data: Product[];
  addItemToCart: (item: AddProduct) => void;
}

const Items: React.FC<Props> = ({ data, addItemToCart }) => {
  return (
    <div className={style.items_container}>
      {data.map(item => (
        <Item key={item.id} item={item} addItemToCart={addItemToCart} />
      ))}
    </div>
  );
};

export default Items;