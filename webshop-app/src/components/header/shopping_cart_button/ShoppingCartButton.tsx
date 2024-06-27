import style from './ShoppingCartButton.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import OrderItemService from '../../../services/OrderItemService';
import { OrderItemType } from '../../MainContainerData';
import CartItem from './cart_item/CartItem';
import { disableScrollLock, enableScrollLock } from '../../../scripts/Global';

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
  const navigate = useNavigate();
  const disableScrollLockTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    showPopup();
    if (e.currentTarget.tagName === "BUTTON") {
      fetchOrderItems();
    }
  };

  const handleOnMouseLeave = () => {
    hidePopup();
  };

  const handleOnFocus = () => {
    showPopup();
  };

  const handleOnBlur = () => {
    hidePopup();
  };

  const showPopup = () => {
    enableScrollLock();
    setShow(true);
    if (disableScrollLockTimeout.current) {
      clearTimeout(disableScrollLockTimeout.current);
      disableScrollLockTimeout.current = null;
    }
  }

  const hidePopup = () => {
    setShow(false);
    disableScrollLockTimeout.current = setTimeout(() => {
      disableScrollLock();
    }, 300);
  }

  const handleOnClick = () => {
    hidePopup();
    navigate("/cart");
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
        showPopup();
        delay(2000).then(() => {
          hidePopup();
        });
      });
    } else {
      document.documentElement.style.setProperty('--color', baseColor);
    }
  }, [activeOrder, baseColor, complColor, fetchOrderItems]);

  return (
    <div>
      <OverlayTrigger
        show={show}
        placement='bottom'
        key='bottom'
        delay={{ show: 300, hide: 500 }}
        overlay={
          <Popover id={style.popover} className={activeOrder !== 0 && orderItems.length > 0 ? style.active : ''} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>

            <Popover.Header className="u-h2" id={style.popover_header}>
              Shopping cart{ activeOrder !== 0 && orderItems.length > 0 ? '' : ' is empty!' }
            </Popover.Header>

            <Popover.Body id={style.popover_body}>
              <span className={`${style.add} u-p2`} style={{
                display: activeOrder !== 0 && orderItems.length > 0 ? 'none' : 'block'              
              }}>
                Feel free to add some products.
              </span>


              { activeOrder !== 0 && orderItems.length > 0 &&
              <div className={style.cart_item_container}>
              {orderItems?.map(item => (
                <CartItem key={item.id} orderItem={item} />
              ))}
              </div>
              }

              { activeOrder !== 0 && orderItems.length > 0 &&
              <div className={style.button_container}>
                <div className={`${style.total_price}`}>
                  <p className='u-h2'>Total price: </p>
                  <p className='u-h2'>${totalPrice.toFixed(2)}</p>
                </div>

                <Link className={`${style.go_to_cart} button_complementary btn-primary u-pb1`} to="/cart" onClick={hidePopup}>
                  Go to Cart
                </Link>

                <Link className={`${style.checkout} button_complementary btn-primary u-pb1`} to="/checkout" onClick={hidePopup}>
                  Checkout
                </Link>
              </div>
              }
            </Popover.Body>
          </Popover>
        }
      >
        <button 
          className={style.cart_button} 
          onMouseEnter={handleOnMouseEnter} 
          onMouseLeave={handleOnMouseLeave}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onClick={handleOnClick}
        >
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
    </div>
  );
}

export default ShoppingCartButton;
