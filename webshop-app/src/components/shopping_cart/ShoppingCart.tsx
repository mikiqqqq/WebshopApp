import React, { useEffect, useState, useCallback, useRef } from "react";
import style from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../services/OrderItemService";
import OrderItem from "./order_item/OrderItem";
import { OrderItemType } from "../MainContainerData";
import useElementaryAnimation from "../../hooks/useElementaryAnimation";

interface ExtendedOrderItemType extends OrderItemType {
  totalPrice: number;
}

const ShoppingCart: React.FunctionComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [orderItems, setOrderItems] = useState<ExtendedOrderItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const activeOrder = Number(localStorage.getItem('activeOrder'));
  const alertRef = useRef<HTMLDivElement>(null);
  useElementaryAnimation();

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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
      setShowAlert(false);
    }
  }, []);

  const handleFocusOutside = useCallback((event: FocusEvent) => {
    if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
      setShowAlert(false);
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("focusin", handleFocusOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [showAlert, handleClickOutside, handleFocusOutside]);

  return (
    <main className={style.main}>
      <div className={style.main_container}>
        <div className={`${style.order_items} animated_content`} data-animation="elementScaleIn">
          <Button className={`${style.empty_cart_button} button_complementary u-pb1`} onClick={() => setShowAlert(true)} disabled={orderItems.length === 0}>
            Empty Cart
          </Button>
          <div className={style.order_items_title}>
            <div className={`${style.heading} u-h1`}>Your Shopping Cart <FontAwesomeIcon icon={faCartShopping} className={`${style.h2_icon}`} /></div>
          </div>
          
          <Alert id={style.alert} ref={alertRef} show={showAlert} variant="danger">
            <Alert.Heading className={`u-h3`}>Empty Shopping Cart</Alert.Heading>
            <p>Are you sure you want to empty the whole cart?</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button className={`u-pb1`} onClick={emptyCart} variant="outline-danger">Yes</Button>
              <Button className={`u-pb1`} id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">Cancel</Button>
            </div>
          </Alert>
          
          <div className={style.order_items_container}>
            {orderItems.length === 0 && <div className={style.empty_cart}><div className={`${style.heading} u-p1`}>Shopping cart is empty.</div></div>}
            {orderItems.map(item => (
              <OrderItem key={item.id} orderItem={item} onPriceChange={handlePriceChange} onRemove={handleRemoveItem} />
            ))}
          </div>
        </div>
        
        <div className={`${style.checkout_section} animated_content`} data-animation="elementFromRight">
          <div className={style.checkout}>
            <div className={`${style.total_price} u-h1`}>Calculated price</div>
            <div className={`${style.p_container_shipping} rte u-p2`}>
              <p>Shipping fee</p> <p>Free</p>
            </div>
            <div className={`${style.p_container} rte u-p2`}>
              <p>Total price</p> <p>${totalPrice.toFixed(2)}</p>
            </div>
            <small className={`${style.label} u-p4`}>Coupons can be used in the next step.</small>
            <Link className={`${style.checkout_button} button_complementary u-pb1 btn btn-primary`} to="/checkout"
                style={{
                  opacity: orderItems.length === 0 ? 0.7 : 1,
                  pointerEvents: orderItems.length === 0 ? 'none' : 'auto'
                }}>
              Checkout
            </Link>
          </div>
          
          <FontAwesomeIcon className={`${style.icon} ${style.flip_animation}`} icon={faCartShopping} />
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;