import React from 'react';
import style from './Order.module.css'; // Adjust the path as necessary
import { OrderObject } from '../../../../MainContainerData';

interface OrderProps {
    order: OrderObject;
}

const Order: React.FC<OrderProps> = ({ order }) => {
    const formatOrderId = (id: number): string => {
        return (id + 1000).toString();
    };

    const calculateSubtotal = (): number => {
        return order.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className={style.orderDetails}>
            <h2>Order #{formatOrderId(order.id)}</h2>
            <p>Placed on {new Date(order.date).toLocaleString()}</p>
            <div className={style.orderItems}>
                {order.products.map(product => (
                    <div key={product.id} className={style.orderItem}>
                        <img src={product.imageUrl} alt={product.title} />
                        <div>
                            <p>{product.title}</p>
                            <p>{product.price.toFixed(2)} €</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.orderSummary}>
                <p>Subtotal: {subtotal.toFixed(2)} €</p>
                <p>Shipping: {shipping.toFixed(2)} €</p>
                <p>Total: {total.toFixed(2)} €</p>
            </div>
        </div>
    );
};

export default Order;