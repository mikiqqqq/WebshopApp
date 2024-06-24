import React from 'react';
import { OrderItemType } from '../../MainContainerData';
import style from './OrderReview.module.css';
import OrderItem from '../../shopping_cart/order_item/OrderItem';

interface Props {
    orderItems: OrderItemType[];
    handlePriceChange: (id: number, newTotalPrice: number) => void;
}

const OrderReview: React.FC<Props> = ({ orderItems, handlePriceChange }) => {
    return (
        <div className={style.order_review_container}>
            <div className={style.order_review_container_header}>
                <p className={style.step_label}>Step 3 of 3</p>
                <h3>Order Review</h3>
            </div>

            {orderItems.length === 0 ? (
                <div className={style.empty_order}>
                    <h4>No order items yet...</h4>
                </div>
            ) : (
                orderItems.map(item => (
                    <OrderItem 
                        key={item.id}
                        orderItem={item}
                        onPriceChange={handlePriceChange}
                        onRemove={() => {}}
                    />
                ))
            )}
        </div>
    );
};

export default OrderReview;