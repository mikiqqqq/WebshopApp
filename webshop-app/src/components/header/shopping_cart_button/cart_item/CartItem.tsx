import React from 'react';
import style from './CartItem.module.css';
import image_placeholder from '../../../../images/image_placeholder.gif';
import { OrderItemType } from '../../../MainContainerData';

interface CartItemProps {
  orderItem: OrderItemType;
}

const CartItem: React.FC<CartItemProps> = ({ orderItem }) => {
    const product = orderItem.item;

    return (
        <div className={style.cart_item} key={orderItem.id}>
        <div className={style.cart_item_body}>
            <img src={product.image || image_placeholder} alt={product.title} />
            <div className={style.info_wrapper}>
                <div className={`${style.cart_iten_title} not_mobile u-pb1`}>{product.title}</div>
                <div className={`${style.cart_iten_title} not_desktop not_pocket u-pb1`}>{product.title.length > 23 ? product.title.slice(0, 20).concat('...') : product.title}</div>
                <div className={style.quantity_price}>
                    <p className="u-p3" id={style.item_quantity}>{orderItem.quantity}</p>
                    <strong className="u-p2" id={style.item_price}>${(orderItem.quantity * product.price).toFixed(2)}</strong>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CartItem;
