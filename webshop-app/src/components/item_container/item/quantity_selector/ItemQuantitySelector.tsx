import React, { useState, useEffect } from 'react';
import style from './ItemQuantitySelector.module.css';

interface ItemQuantitySelectorProps {
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const ItemQuantitySelector: React.FunctionComponent<ItemQuantitySelectorProps> = ({ maxQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const increment = () => {
    if (quantity + 1 > maxQuantity) return;

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    if (newQuantity >= maxQuantity) {
      setMessage(' - Maxed out');
    } else {
      setMessage('');
    }
  };

  const decrement = () => {
    if (quantity - 1 > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setMessage('');
    }
  };

  return (
    <div className={style.quantity_counter}>
      <button className={`${style.quantity_button} ${style.quantity_button_decrement}`} onClick={decrement}>
        <p>-</p>
      </button>
      <p className={style.quantity_display}>{quantity}{message}</p>
      <button className={`${style.quantity_button} ${style.quantity_button_increment}`} onClick={increment}>
        <p>+</p>
      </button>
    </div>
  );
}

export default ItemQuantitySelector;