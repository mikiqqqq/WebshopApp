import style from './ShoppingCartButton.module.css'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Hit } from '../../MainContainerData';
import itemImg from '../../../images/item.jpg'
import { Link } from 'react-router-dom';


interface Props {
  orderItems: Hit[];
  activeOrder: number;
}

const ShoppingCartButton: React.FunctionComponent<Props> = props => {
  const [show, setShow] = useState<boolean>(false);
  const [scale, setScale] = useState<string>("24px");
  const baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
  const complColor = window.getComputedStyle(document.documentElement).getPropertyValue('--complementary-color');

  const handleOnMouseEnter = () => {
    setShow(true);
  }

  const handleOnMouseLeave = () => {
    setShow(false);
  }

  function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  useEffect(() => {
    if (props.activeOrder) {
      document.documentElement.style.setProperty('--color', complColor);
      setScale("30px");
      delay(1000).then(() => {
        setScale("24px");
        handleOnMouseEnter();
        delay(2000).then(() => {
          handleOnMouseLeave();
        })
      })
    }else{
      document.documentElement.style.setProperty('--color', baseColor);
    }
  }, [props.activeOrder])

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
            style={{color: props.activeOrder ? 'lavender' : '#333'}}>
              Your Shopping Cart
              <span style={{ display: props.activeOrder ? 'none' : 'block'}}>is Empty!</span>
            </Popover.Header>

            <Popover.Body id={style.popover_body}>
              <span style={{
                display: props.activeOrder ? 'none' : 'block',
                padding: "10px 20px", textAlign: "center"
              }}>
                Add some products!
              </span>

              <div className={style.cart_item_container}>
                {props.orderItems?.map(item => {
                  totalPrice += item.quantity * item.price;
                  return (
                    <div className={style.cart_item} key={item.id}>
                      <h5>{item.name.length > 23 ? item.name.slice(0, 22).concat('...') : item.name}</h5>
                      <div className={style.cart_item_body}>
                        <img src={itemImg} alt={item.name} />
                        <div>
                          <p id={style.item_quantity}>{item.quantity}</p>
                          <strong id={style.item_price}>${(item.quantity * item.price).toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={props.activeOrder ? style.button_container : style.display_none}>
                <h4>Total price: ${totalPrice.toFixed(2)}</h4>

                <Link className={style.go_to_cart} to="/shopping_cart">
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
              color: props.activeOrder ? complColor : baseColor,
              fontSize: scale
            }}
            icon={faCartShopping} />
        </button>
      </OverlayTrigger>
    </>
  );
}
export default ShoppingCartButton;