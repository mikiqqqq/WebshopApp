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

  const increment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (quantity + 1 > maxQuantity) return;

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    if (newQuantity >= maxQuantity) {
      setMessage(' - Max');
    } else {
      setMessage('');
    }
  };

  const decrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (quantity - 1 > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setMessage('');
    }
  };

  return (
    <div className={style.container} onClick={(e) => e.preventDefault()}>
      <div className={style.quantity_counter}>
        <button
          className={`${style.quantity_button} ${style.quantity_button_decrement}`}
          onClick={decrement}
        >
          <p>-</p>
        </button>
        <p className={`${style.quantity_display} quantity_display`}>{quantity}{message}</p>
        <button
          className={`${style.quantity_button} ${style.quantity_button_increment}`}
          onClick={increment}
        >
          <p>+</p>
        </button>
      </div>
    </div>
  );
}

export default ItemQuantitySelector;