import React from 'react';
import { OrderItemType } from '../../MainContainerData';
import style from './OrderReview.module.css';
import OrderItem from '../../shopping_cart/order_item/OrderItem';

interface Props {
    orderItems: OrderItemType[];
    handlePriceChange: (id: number, newTotalPrice: number) => void;
    onRemoveItem: (id: number) => void;
}

const OrderReview: React.FC<Props> = ({ orderItems, handlePriceChange, onRemoveItem }) => {
    return (
        <div className={style.order_review_container}>
            <div className={style.order_review_container_header}>
                <p className={`${style.step_label} u-p2`}>Step 2 of 3</p>
                <div className={`${style.heading} u-h2`}>Order review</div>
            </div>

            {orderItems.length === 0 ? (
                <div className={style.empty_order}>
                    <div className={`u-p1`}>No order items yet...</div>
                </div>
            ) : (
                orderItems.map(item => (
                    <OrderItem 
                        key={item.id}
                        orderItem={item}
                        onPriceChange={handlePriceChange}
                        onRemove={onRemoveItem}
                    />
                ))
            )}
        </div>
    );
};

export default OrderReview;