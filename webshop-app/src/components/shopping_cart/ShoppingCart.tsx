import React, { useEffect, useState } from "react";
import { Hit } from "../MainContainerData";
import style from "./ShoppingCart.module.css"
import OrderItem from "./order_item/OrderItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import OrderItemService from "../../services/OrderItemService";


interface Props{
    orderItems: Hit[];
    activeOrder: number;

    addOrRemoveOrderItem(orderItemId: number, decider: number): void;
    removeOrderItemAll(orderItemId: number): void;
}

const ShoppingCart:React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;

    return(
        <main className={style.main}>
            <div className={style.main_container}>
                <div className={style.order_items}>
                    <h2>
                        Your Shopping Cart &nbsp;
                        <FontAwesomeIcon icon={faCartShopping} />
                    </h2>
                    <div className={style.order_items_container}>
                        {props.orderItems?.map(item => {
                            totalPrice += item.quantity * item.price;
                            return <OrderItem key={item.id} orderItem={item} 
                            removeOrderItemAll={props.removeOrderItemAll} addOrRemoveOrderItem={props.addOrRemoveOrderItem}/>;
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
                            <p>Total price</p> <p>${totalPrice}</p>
                        </div>
                        <small>Coupons can be used in the next step.</small>
                        <Link className={style.checkout_button} to="/checkout">
                            Checkout
                        </Link>
                    </div>

                    <FontAwesomeIcon className={style.icon} icon={faCartShopping} />
                </div>
            </div>
        </main>
    );
}

export default ShoppingCart;