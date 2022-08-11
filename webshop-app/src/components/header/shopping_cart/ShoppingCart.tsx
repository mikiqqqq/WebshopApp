import style from './ShoppingCart.module.css'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import OrderItemService from '../../../services/OrderItemService';
import { Hit } from '../../MainContainerData';
import ItemService from '../../../services/ItemService';
import itemImg from '../../../images/item.jpg'


interface Props{
    orderItems: Hit[];
    activeOrder: number;
    red: string;
}

const ShoppingCart:React.FunctionComponent<Props> = props => {
    const [show, setShow] = useState<boolean>(false);
    const [scale, setScale] = useState<string>("24px");

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
      if(props.activeOrder){
        setScale("30px");
        delay(1000).then(() => {
          setScale("24px");
          handleOnMouseEnter();
          delay(2000).then(() => {
            handleOnMouseLeave();
          })
        })
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
             
              <Popover.Header as="h3" id={style.popover_header}>Your Shopping Cart
                <span style={{display: props.activeOrder ? 'none' : 'block'}}>is Empty!</span>
              </Popover.Header>
              
              <Popover.Body id={style.popover_body}>
                <span style={{display: props.activeOrder ? 'none' : 'block',
                              padding: "10px 20px", textAlign: "center"}}>
                  Add some products!
                </span>

                <div className={style.cart_item_container}>
                  {props.orderItems?.map(item => {
                    totalPrice += item.quantity * item.price;
                    return (
                    <div className={style.cart_item} key={item.id}>
                      <h5>{item.name}</h5>
                      <div className={style.cart_item_body}>
                        <img src={itemImg} alt={item.name}/>
                        <div>
                          <strong id={style.item_price}>${item.quantity * item.price}</strong>
                          <p id={style.item_quantity}>{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>

                <div className={props.activeOrder ? style.button_container : style.display_none}>
                  <h4>Total price: ${totalPrice}</h4>

                  <button className={style.go_to_cart}>
                    Go To Cart
                  </button>

                  <button className={style.checkout}>
                    Checkout
                  </button>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <button className={style.cart_button} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <FontAwesomeIcon 
                    className={style.icon}
                    id="cart_button"
                    style={{color: props.red === "red" ? '#7F38EC' : '#7CFC00',
                            fontSize: scale}}
                    icon={faCartShopping} />
          </button>
        </OverlayTrigger>
    </>
  );}

  export default ShoppingCart;