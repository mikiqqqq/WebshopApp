import React, { useState, useEffect, useCallback, useMemo } from 'react';
import OrderService from '../../../../services/OrderService';
import ItemService from '../../../../services/ItemService'; // Adjust the path as necessary
import style from './Orders.module.css';
import { OrderObject, Product } from '../../../MainContainerData';
import Order from './order/Order';

const Orders: React.FC = () => {
    const [showInProgress, setShowInProgress] = useState(true);
    const [activeOrders, setActiveOrders] = useState<OrderObject[]>([]);
    const [completedOrders, setCompletedOrders] = useState<OrderObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    console.log("rendered")

    const fetchOrdersAndProducts = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch active orders
            const activeResponse = await OrderService.fetchActiveOrders();
            const activeOrdersWithProducts = await Promise.all(
                activeResponse.data.map(async (order: OrderObject) => {
                    const productsResponse = await ItemService.fetchOrderProducts(order.id);
                    const products = productsResponse.data.map((product: Product) => {
                        const imageBlob = product.image ? new Blob([product.image]) : null;
                        const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : 'placeholder-image-url';
                        return { ...product, imageUrl };
                    });
                    return { ...order, products };
                })
            );
            setActiveOrders(activeOrdersWithProducts);

            // Fetch completed orders
            const completedResponse = await OrderService.fetchCompletedOrders();
            const completedOrdersWithProducts = await Promise.all(
                completedResponse.data.map(async (order: OrderObject) => {
                    const productsResponse = await ItemService.fetchOrderProducts(order.id);
                    const products = productsResponse.data.map((product: Product) => {
                        const imageBlob = product.image ? new Blob([product.image]) : null;
                        const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : 'placeholder-image-url';
                        return { ...product, imageUrl };
                    });
                    return { ...order, products };
                })
            );
            setCompletedOrders(completedOrdersWithProducts);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrdersAndProducts();
    }, [fetchOrdersAndProducts]);

    // Memoize the order lists to prevent unnecessary re-renders
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
                {loading ? (
                    <p>Loading orders...</p>
                ) : showInProgress ? (
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