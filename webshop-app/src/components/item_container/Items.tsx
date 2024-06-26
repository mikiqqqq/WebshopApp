import React from 'react';
import { Product } from '../MainContainerData';
import style from './Items.module.css';
import Item from './item/Item';
import useElementaryAnimation from '../../hooks/useElementaryAnimation';

interface Props {
  data: Product[];
}

const Items: React.FC<Props> = ({ data }) => {
  useElementaryAnimation();

  return (
    <div className={`${style.items_container}`} data-animation="elementFromBottom">
      {data.map(item => (
        <Item key={`${item.id}-${Math.random()}`} item={item} />
      ))}
    </div>
  );
};

export default Items;