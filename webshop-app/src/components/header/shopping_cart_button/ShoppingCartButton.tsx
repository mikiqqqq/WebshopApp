import style from './ShoppingCartButton.module.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import itemImg from '../../../images/item.jpg';
import { Link } from 'react-router-dom';
import OrderItemService from '../../../services/OrderItemService';
import { Product } from '../../MainContainerData';

const ShoppingCartButton: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [scale, setScale] = useState<string>("24px");
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
  const complColor = window.getComputedStyle(document.documentElement).getPropertyValue('--complementary-color');
  const activeOrder = Number(localStorage.getItem('activeOrder'));

  const handleOnMouseEnter = () => {
    setShow(true);
  };

  const handleOnMouseLeave = () => {
    setShow(false);
  };

  function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (activeOrder) {
        try {
          const response = await OrderItemService.fetchAllByOrderId(activeOrder);
          setOrderItems(response.data);
        } catch (error) {
          console.error("Error fetching order items:", error);
        }
      } else {
        setOrderItems([]);
      }
    };

    fetchOrderItems();

    if (activeOrder) {
      document.documentElement.style.setProperty('--color', complColor);
      setScale("30px");
      delay(1000).then(() => {
        setScale("24px");
        handleOnMouseEnter();
        delay(2000).then(() => {
          handleOnMouseLeave();
        });
      });
    } else {
      document.documentElement.style.setProperty('--color', baseColor);
    }
  }, [activeOrder, baseColor, complColor]);

  let totalPrice: number = 0;

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
              color: activeOrder ? complColor : baseColor,
              fontSize: scale
            }}
            icon={faCartShopping} />
        </button>
      </OverlayTrigger>
    </>
  );
}

export default ShoppingCartButton;