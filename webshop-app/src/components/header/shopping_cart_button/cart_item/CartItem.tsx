import React from 'react';
import style from './CartItem.module.css';
import itemImg from '../../../../images/item.jpg';
import { OrderItemType } from '../../../MainContainerData';

interface CartItemProps {
  orderItem: OrderItemType;
}

const CartItem: React.FC<CartItemProps> = ({ orderItem }) => {
    const product = orderItem.item;

    return (
        <div className={style.cart_item} key={orderItem.id}>
        <h5>{product.title.length > 23 ? product.title.slice(0, 22).concat('...') : product.title}</h5>
        <div className={style.cart_item_body}>
            <img src={itemImg} alt={product.title} />
            <div>
            <p id={style.item_quantity}>{orderItem.quantity}</p>
            <strong id={style.item_price}>${(orderItem.quantity * product.price).toFixed(2)}</strong>
            </div>
        </div>
        </div>
    );
};

export default CartItem;
