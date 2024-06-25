// QuantityCounter.tsx
import React, { useState, useEffect } from 'react';
import style from './QuantitySelector.module.css';
import OrderItemService from '../../services/OrderItemService';
import { OrderItemType, Product } from '../MainContainerData';

interface QuantityCounterProps {
  orderItem: OrderItemType;
  product: Product | undefined;
  onPriceChange: (id: number, totalPrice: number) => void;
}

const QuantitySelector: React.FunctionComponent<QuantityCounterProps> = ({ orderItem, product, onPriceChange }) => {
  const [quantity, setQuantity] = useState<number>(orderItem.quantity);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setQuantity(orderItem.quantity);
  }, [orderItem.quantity]);

  const increment = () => {
    if (!product || quantity + 1 > product.quantity) return;

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    orderItem.quantity = newQuantity;
    OrderItemService.updateOrderItem(orderItem);
    onPriceChange(orderItem.id, product.price * newQuantity);

    if (newQuantity >= product.quantity) {
      setMessage(' - Max');
    } else {
      setMessage('');
    }
  };

  const decrement = () => {
    if (!product) return;

    if (quantity - 1 > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      orderItem.quantity = newQuantity;
      OrderItemService.updateOrderItem(orderItem);
      onPriceChange(orderItem.id, product.price * newQuantity);
      setMessage('');
    }
  };

  return (
    <div className={`${style.container} quantity_container`}  onClick={(e) => e.preventDefault()}>
      <div className={style.quantity_counter}>
        <button className={`${style.quantity_button} ${style.quantity_button_decrement}`} onClick={decrement}>
          <p>-</p>
        </button>
        <p className={`${style.quantity_display} quantity_display`}>{quantity}{message}</p>
        <button className={`${style.quantity_button} ${style.quantity_button_increment}`} onClick={increment}>
          <p>+</p>
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;