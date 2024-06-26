import React, { useState, useMemo } from 'react';
import { OrderObject } from '../../../MainContainerData';
import Order from './order/Order'; // Ensure this path is correct
import style from './Orders.module.css';
import useElementaryAnimation from '../../../../hooks/useElementaryAnimation';

interface OrdersProps {
    activeOrders: OrderObject[];
    completedOrders: OrderObject[];
}

const Orders: React.FC<OrdersProps> = ({ activeOrders, completedOrders }) => {
    const [showInProgress, setShowInProgress] = useState(true);
    useElementaryAnimation();

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
        <div className={`${style.container} animated_content`} data-animation="elementScaleIn">
            <div className={`${style.orders_heading} u-h1`}>Orders</div>
            <div className={style.button_container}>
                <button
                    className={`${style.button} u-pb1 ${showInProgress ? style.selected : ''}`}
                    onClick={() => setShowInProgress(true)}
                >
                    Active orders
                </button>
                <button
                    className={`${style.button} u-pb1 ${!showInProgress ? style.selected : ''}`}
                    onClick={() => setShowInProgress(false)}
                >
                    Order history
                </button>
            </div>
            <div>
                {showInProgress ? (
                    activeOrders.length > 0 ? (
                        <div className={style.list_container}>{activeOrdersList}</div>
                    ) : (
                        <p>No active orders found</p>
                    )
                ) : completedOrders.length > 0 ? (
                    <div className={style.list_container}>{completedOrdersList}</div>
                ) : (
                    <p>No completed orders found</p>
                )}
            </div>
        </div>
    );
};

export default Orders;