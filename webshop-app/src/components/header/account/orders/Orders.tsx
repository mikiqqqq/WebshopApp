import React, { useState, useMemo } from 'react';
import { OrderObject } from '../../../MainContainerData';
import Order from './order/Order'; // Ensure this path is correct
import style from './Orders.module.css';

interface OrdersProps {
    activeOrders: OrderObject[];
    completedOrders: OrderObject[];
}

const Orders: React.FC<OrdersProps> = ({ activeOrders, completedOrders }) => {
    const [showInProgress, setShowInProgress] = useState(true);

    // Memoizing the orders lists to avoid unnecessary re-renders
    const activeOrdersList = useMemo(() => (
        activeOrders.map(order => (
            <Order key={order.id} order={order} />
        ))
    ), [activeOrders]);

    const completedOrdersList = useMemo(() => (
        completedOrders.map(order => (
            <Order key={order.id} order={order} />
        ))
    ), [completedOrders]);

    return (
        <div className={style.orders_container}>
            <div className={`${style.orders_heading} u-h1`}>Orders</div>
            <div className={style.order_buttons}>
                <button
                    className={`${style.orders_button} u-pb1 ${showInProgress ? style.button_selected : ''}`}
                    onClick={() => setShowInProgress(true)}
                >
                    Active orders
                </button>
                <button
                    className={`${style.orders_button} u-pb1 ${!showInProgress ? style.button_selected : ''}`}
                    onClick={() => setShowInProgress(false)}
                >
                    Order history
                </button>
            </div>
            <div>
                {showInProgress ? (
                    activeOrders.length > 0 ? (
                        <div>{activeOrdersList}</div>
                    ) : (
                        <p>No active orders found</p>
                    )
                ) : completedOrders.length > 0 ? (
                    <div>{completedOrdersList}</div>
                ) : (
                    <p>No completed orders found</p>
                )}
            </div>
        </div>
    );
};

export default Orders;