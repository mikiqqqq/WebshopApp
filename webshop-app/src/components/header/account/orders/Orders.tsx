import React, { useState, useEffect } from 'react';
import OrderService from '../../../../services/OrderService';
import style from './Orders.module.css';
import { Order } from '../../../MainContainerData';

const Orders: React.FC = () => {
    const [showInProgress, setShowInProgress] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchOrders();
    }, [showInProgress]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const fetchedOrders = showInProgress
                ? await OrderService.fetchActiveOrders()
                : await OrderService.fetchCompletedOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.orders_container}>
            <div className={`${style.orders_heading} u-h1`}>Orders</div>
            <div>
                <button
                    className={`${style.orders_button} u-pb1 ${showInProgress ? style.selected : ''}`}
                    onClick={() => setShowInProgress(true)}
                >
                    Active orders
                </button>
                <button
                    className={`${style.orders_button} u-pb1 ${!showInProgress ? style.selected : ''}`}
                    onClick={() => setShowInProgress(false)}
                >
                    Order history
                </button>
            </div>
            <div>
                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length > 0 ? (
                    <p>Hello</p>
                ) : (
                    <p>No orders found</p>
                )}
            </div>
        </div>
    );
};

export default Orders;