import style from './ShoppingCartButton.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import itemImg from '../../../images/item.jpg';
import { Link } from 'react-router-dom';
import OrderItemService from '../../../services/OrderItemService';
import { OrderItemType, Product } from '../../MainContainerData';
import CartItem from './cart_item/CartItem';

interface ExtendedOrderItemType extends OrderItemType {
  totalPrice: number;
}
const ShoppingCartButton: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [scale, setScale] = useState<string>("24px");
  const [orderItems, setOrderItems] = useState<ExtendedOrderItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
  const complColor = window.getComputedStyle(document.documentElement).getPropertyValue('--complementary-color');
  const activeOrder = Number(localStorage.getItem('activeOrder'));

  useEffect(() => {
    console.log("Rendered");
  });

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setShow(true);
    if (e.currentTarget.tagName === "BUTTON") {
      fetchOrderItems();
    }
  };

  const handleOnMouseLeave = () => {
    setShow(false);
  };

  function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

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

  useEffect(() => {
    fetchOrderItems();

    if (orderItems.length > 0) {
      document.documentElement.style.setProperty('--color', complColor);
      setScale("30px");
      delay(1000).then(() => {
        setScale("24px");
        setShow(true);
        delay(2000).then(() => {
          setShow(false);
        });
      });
    } else {
      document.documentElement.style.setProperty('--color', baseColor);
    }
  }, [activeOrder, baseColor, complColor ]);

  return (
    <>
      <OverlayTrigger
        show={show}
        placement='bottom'
        key='bottom'
        delay={{ show: 300, hide: 500 }}
        overlay={
          <Popover id={style.popover} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>

            <Popover.Header as="h3" id={style.popover_header}
              style={{ color: activeOrder ? 'lavender' : '#333' }}>
              Your Shopping Cart
              <span style={{ display: activeOrder ? 'none' : 'block' }}>is Empty!</span>
            </Popover.Header>

            <Popover.Body id={style.popover_body}>
              <span style={{
                display: activeOrder ? 'none' : 'block',
                padding: "10px 20px", textAlign: "center"
              }}>
                Add some products!
              </span>

              <div className={style.cart_item_container}>
              {orderItems?.map(item => (
                <CartItem key={item.id} orderItem={item} />
              ))}
              </div>

              <div className={activeOrder ? style.button_container : style.display_none}>
                <h4>Total price: ${totalPrice.toFixed(2)}</h4>

                <Link className={style.go_to_cart} to="/cart">
                  Go to Cart
                </Link>

                <Link className={style.checkout} to="/checkout">
                  Checkout
                </Link>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button className={style.cart_button} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
          <FontAwesomeIcon
            className={style.icon}
            id="cart_button"
            style={{
              color: orderItems.length > 0 ? complColor : baseColor,
              fontSize: scale
            }}
            icon={faCartShopping} />
        </button>
      </OverlayTrigger>
    </>
  );
}

export default ShoppingCartButton;