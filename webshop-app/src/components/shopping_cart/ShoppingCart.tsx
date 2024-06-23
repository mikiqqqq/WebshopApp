import React, { useEffect, useState } from "react";
import { Product } from "../MainContainerData";
import style from "./ShoppingCart.module.css"
import OrderItem from "./order_item/OrderItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../services/OrderItemService";


interface Props {
    addOrRemoveOrderItem(orderItemId: number, decider: number): void;
    emptyShoppingCart(empty: boolean): void;
}

const ShoppingCart: React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;
    const [showAlert, setShowAlert] = useState(false);
    const [rotate, setRotate] = useState(false);
    const [orderItems, setOrderItems] = useState<Product[]>([]);
    const activeOrder = Number(localStorage.getItem('activeOrder'));

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

    const emptyCart = () => {
        setShowAlert(false);   
        delay(500).then(() => {
            props.emptyShoppingCart(true);
        });
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
      }, [activeOrder]);

    const rotateIcon = () => {
        setRotate(true);
        const timeoutID = setTimeout(() => {
            setRotate(false);
        }, 2500);
        return () => clearTimeout(timeoutID);
    }

    useEffect(() => {
        setInterval(rotateIcon, 30000);
    }, [])

    return (
        <main className={style.main}>
            <div className={style.main_container}>
                <div className={style.order_items}>
                    <div className={style.order_items_title}>
                    <h2>
                        Your Shopping Cart &nbsp;
                        <FontAwesomeIcon icon={faCartShopping} className={style.h2_icon}/>
                    </h2>
                    </div>
                    <button className={style.empty_cart_button}
                        onClick={() => setShowAlert(true)} disabled={orderItems.length === 0}>
                        Empty Cart
                    </button>

                    <Alert id={style.alert} show={showAlert} variant="danger">
                        <Alert.Heading>Empty Shopping Cart</Alert.Heading>
                        <p>
                            Are you sure you want to empty the whole cart?
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={emptyCart} variant="outline-danger">
                                Yes
                            </Button>
                            
                            <Button id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">
                                Cancel
                            </Button>
                        </div>
                    </Alert>

                    <div className={style.order_items_container}>
                        {orderItems.length === 0 &&
                            <div className={style.empty_cart}>
                                <h4>Shopping cart is empty.</h4>
                            </div>
                        }
                        {orderItems?.map(item => {
                            totalPrice += item.quantity * item.price;
                            return <OrderItem key={item.id} orderItem={item}
                                removeOrderItemAll={props.removeOrderItemAll} addOrRemoveOrderItem={props.addOrRemoveOrderItem} />;
                        })}
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
                        <Link className={style.checkout_button} to="/checkout">
                            Checkout
                        </Link>
                    </div>

                    <FontAwesomeIcon className={style.icon} icon={faCartShopping} 
                    style={{transform: rotate ? 'scaleX(-1)' : 'scaleX(1)'}} />
                </div>
            </div>
        </main>
    );
}

export default ShoppingCart;