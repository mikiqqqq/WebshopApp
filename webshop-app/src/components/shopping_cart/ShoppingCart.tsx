import React, { useEffect, useState } from "react";
import { Hit } from "../MainContainerData";
import style from "./ShoppingCart.module.css"
import OrderItem from "./order_item/OrderItem";
import { Link } from "react-router-dom";
import shoppingCart from '../../images/shopping_cart.png'

interface Props{
    orderItems: Hit[];
    activeOrder: number;
}

const ShoppingCart:React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;

    return(
        <main className={style.main}>
            <div className={style.main_container}>
                <div className={style.order_items}>
                    <h2>Your Shopping Cart</h2>
                    <div className={style.order_items_container}>
                        {props.orderItems?.map(item => {
                            totalPrice += item.quantity * item.price;
                            return <OrderItem orderItem={item}/>;
                        })}
                    </div>
                </div>

                <div className={style.checkout_section}>
                    <div className={style.checkout}>
                        <h3>Total Price</h3>
                        <div className={style.p_container_shipping}>
                            <p>Shipping</p> <p>Free</p>
                        </div>
                        <div className={style.p_container}>
                            <p>Total price</p> <p>${totalPrice}</p>
                        </div>
                        <small>Coupons can be used in the next step.</small>
                        <Link className={style.checkout_button} to="/checkout">
                            Checkout
                        </Link>
                    </div>
                    <img src={shoppingCart}/>
                </div>
            </div>
        </main>
    );
}

export default ShoppingCart;