import React from 'react';
import { AddProduct, Product } from '../MainContainerData';
import style from './Items.module.css';
import Item from './item/Item';

interface Props {
  data: Product[];
}

const Items: React.FC<Props> = ({ data }) => {
  return (
    <div className={style.items_container}>
      {data.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Items;