import React, { useEffect, useState, useCallback } from "react";
import style from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../services/OrderItemService";
import OrderItem from "./order_item/OrderItem";
import { OrderItemType } from "../MainContainerData";

interface ExtendedOrderItemType extends OrderItemType {
  totalPrice: number;
}

const ShoppingCart: React.FunctionComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [orderItems, setOrderItems] = useState<ExtendedOrderItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const activeOrder = Number(localStorage.getItem('activeOrder'));

  const fetchOrderItems = useCallback(async () => {
    if (activeOrder) {
      try {
        const response = await OrderItemService.fetchAllByOrderId(activeOrder);
        const fetchedOrderItems = response.data.map((item: OrderItemType) => ({
          ...item,
          totalPrice: item.quantity * item.item.price // Calculate total price using product price
        }));
        setOrderItems(fetchedOrderItems);
        const newTotalPriceSum = fetchedOrderItems.reduce((acc: number, item: ExtendedOrderItemType) => acc + item.totalPrice, 0);
        setTotalPrice(newTotalPriceSum);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    } else {
      setOrderItems([]);
      setTotalPrice(0);
    }
  }, [activeOrder]);

  const emptyCart = async () => {
    setShowAlert(false);
    try {
      await OrderItemService.deleteAllOrderItemsByOrderId(activeOrder);
      fetchOrderItems();
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [activeOrder, fetchOrderItems]);

  const handlePriceChange = useCallback((id: number, newTotalPrice: number) => {
    setOrderItems(prevOrderItems => {
      const updatedOrderItems = prevOrderItems.map(item =>
        item.id === id ? { ...item, totalPrice: newTotalPrice } : item
      );
      const newTotalPriceSum = updatedOrderItems.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalPrice(newTotalPriceSum);
      return updatedOrderItems;
    });
  }, []);

  const handleRemoveItem = useCallback(async (id: number) => {
    fetchOrderItems();
  }, [fetchOrderItems]);

  return (
    <main className={style.main}>
      <div className={style.main_container}>
        <div className={style.order_items}>
          <div className={style.order_items_title}>
            <h2>Your Shopping Cart <FontAwesomeIcon icon={faCartShopping} className={`${style.h2_icon}`} /></h2>
          </div>
          <button className={style.empty_cart_button} onClick={() => setShowAlert(true)} disabled={orderItems.length === 0}>
            Empty Cart
          </button>
          
          <Alert id={style.alert} show={showAlert} variant="danger">
            <Alert.Heading>Empty Shopping Cart</Alert.Heading>
            <p>Are you sure you want to empty the whole cart?</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={emptyCart} variant="outline-danger">Yes</Button>
              <Button id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">Cancel</Button>
            </div>
          </Alert>
          
          <div className={style.order_items_container}>
            {orderItems.length === 0 && <div className={style.empty_cart}><h4>Shopping cart is empty.</h4></div>}
            {orderItems.map(item => (
              <OrderItem key={item.id} orderItem={item} onPriceChange={handlePriceChange} onRemove={handleRemoveItem} />
            ))}
          </div>
        </div>
        
        <div className={style.checkout_section}>
          <div className={style.checkout}>
            <h3>Total Price</h3>
            <div className={style.p_container_shipping}>
              <p>Shipping fee</p> <p>Free</p>
            </div>
            <div className={style.p_container}>
              <p>Total price</p> <p>${totalPrice.toFixed(2)}</p>
            </div>
            <small>Coupons can be used in the next step.</small>
            <Link className={style.checkout_button} to="/checkout">Checkout</Link>
          </div>
          
          <FontAwesomeIcon className={`${style.icon} ${style.flip_animation}`} icon={faCartShopping} />
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;