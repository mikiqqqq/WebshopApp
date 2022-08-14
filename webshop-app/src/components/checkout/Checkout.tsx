import React, { useEffect, useState } from "react";
import { Hit } from "../MainContainerData";
import style from "./Checkout.module.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import OrderItem from "../shopping_cart/order_item/OrderItem";
import OrderItemService from "../../services/OrderItemService";
import ShippingInfo from "./steps/ShippingInfo";
import PaymentInfo from "./steps/PaymentInfo";

interface Props{
    orderItems: Hit[];
    activeOrder: number;

    addOrRemoveOrderItem(orderItemId: number, decider: number): void;
    removeOrderItemAll(orderItemId: number): void;
}

const Checkout:React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;

    return(
        <main className={style.main}>
            <div className={style.main_container}>
                <div className={style.checkout_info}>
                    <h2>Checkout&nbsp;&nbsp;<FontAwesomeIcon icon={faCreditCard} /></h2>
                    
                    <ShippingInfo/>
                    
                    <PaymentInfo/>

                    <div className={style.step_three}>
                        <div className={style.steph_three_header}>
                            <p className={style.step_p}>Step 3 of 3</p>
                            <h3>Order Review</h3>
                        </div>

                        {props.orderItems?.map(item => {
                            totalPrice += item.quantity * item.price;
                            return <OrderItem key={item.id} orderItem={item} 
                            removeOrderItemAll={props.removeOrderItemAll} addOrRemoveOrderItem={props.addOrRemoveOrderItem}/>;
                        })}
                    </div>
                </div>

                <div className={style.order_info}>
                    <div className={style.order_summary}>
                        <h3>Order Summary</h3>
                        <div className={style.p_container}>
                            <p>Subtotal</p> <p>${(totalPrice*0.95).toFixed(2)}</p>
                        </div>
                        <div className={style.p_container_shipping}>
                            <p>Shipping fee</p> <p>Free</p>
                        </div>
                        <div className={style.p_container}>
                            <p>Est. taxes &amp; fees</p> <p>${(totalPrice - (totalPrice*0.95)).toFixed(2)}</p>
                        </div>
                        <div className={style.p_container}>
                            <p>Coupon discount</p> <p>None</p>
                        </div>
                        <hr/>
                        <div>
                            <input type="text" placeholder="Discount Code"></input>
                            <button>Apply</button>
                        </div>
                        <hr/>
                        <div className={style.p_container}>
                            <h4>TOTAL</h4> <h4><small id={style.small}>(USD) </small>${totalPrice}</h4>
                        </div>
                        <Link className={style.place_order_button} to="/checkout">
                            Place Order
                        </Link>
                    </div>

                    <FontAwesomeIcon className={style.icon} icon={faCreditCard} />
                </div>
            </div>
        </main>
    );
}

export default Checkout;