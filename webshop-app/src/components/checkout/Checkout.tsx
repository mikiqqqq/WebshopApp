import React, { useEffect, useState } from "react";
import { DiscountCode, Product, OrderUpdate } from "../MainContainerData";
import style from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Alert } from "react-bootstrap";
import OrderItem from "../shopping_cart/order_item/OrderItem";
import ShippingInfo from "./steps/ShippingInfo";
import PaymentInfo from "./steps/PaymentInfo";
import DiscountCodeService from "../../services/DiscountCodeService";
import OrderService from "../../services/OrderService";

interface Props {
    orderItems: Product[];
    activeOrder: number;

    addOrRemoveOrderItem(orderItemId: number, decider: number): void;
    removeOrderItemAll(orderItemId: number): void;
    orderCompleted(orderCompleted: boolean): void;
}

const Checkout: React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;
    let discountCode: DiscountCode;
    let dayOfDeliveryStart = new Date(new Date().setDate(new Date().getDate() + 15));
    let dayOfDeliveryEnd = new Date(new Date().setDate(new Date().getDate() + 18));
    let navigate = useNavigate();

    const [totalPriceState, setTotalPriceState] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const [discountInputValue, setDiscountInputValue] = useState('');
    const [appliedDiscountCode, setAppliedDiscountCode] = useState<DiscountCode>();
    const [discountAmount, setDiscountAmount] = useState('0');
    const [discountUsed, setDiscountUsed] = useState(false);

    const [errorDiscountMsg, setErrorDiscountMsg] = useState('');
    const [successDiscountMsg, setSuccessDiscountMsg] = useState('');

    const [allFormsValidated, setAllFormsValidated] = useState(false);

    const [validatedShippingInfo, setValidatedShippingInfo] = useState(false);
    const [validatedPaymentInfo, setValidatedPaymentInfo] = useState(false);
    const [shippingInfo, setShippingInfo] = useState<any>();
    const [paymentInfo, setPaymentInfo] = useState<any>();

    const [showAlert, setShowAlert] = useState(false);

    const [orderUpdated, setOrderUpdated] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountInputValue(event.target.value);
    }

    const checkDiscountCode = async () => {
        setSuccessDiscountMsg('');

        if (discountInputValue.length < 10) {
            setErrorDiscountMsg('Discount Code must be longer than 10 characters!');
            return;
        }
        if (!discountUsed) {
            discountCode = (await DiscountCodeService.checkDiscountCode(discountInputValue)).data;

            if (discountCode.code === undefined) {
                setErrorDiscountMsg('Discount Code you entered is invalid!');
                return;
            }
            if (!discountCode.active) {
                setErrorDiscountMsg('Discount Code you entered is not active anymore!');
                return;
            }

            setAppliedDiscountCode(discountCode);
            setErrorDiscountMsg('');
            setSuccessDiscountMsg('You successfully applied your discount code!')

        } else setErrorDiscountMsg('You cannot enter more than 2 discount codes.');
    }

    const checkFormValidation = () => {
        if (validatedShippingInfo && validatedPaymentInfo) {
            const timeoutId = setTimeout(() => {
                setAllFormsValidated(true);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }

        else {
            setAllFormsValidated(false);
            setShowAlert(true);
        }
    }

    useEffect(() => {
        if (appliedDiscountCode?.active) {
            setTotalPriceState(totalPriceState * (1 - appliedDiscountCode.discountAmount));
            setDiscountAmount((totalPriceState * appliedDiscountCode.discountAmount).toFixed(2));
            setDiscountUsed(true);
        }
    }, [appliedDiscountCode])

    useEffect(() => {
        totalPrice = 0;
        props.orderItems?.map(item => {
            totalPrice += item.quantity * item.price;
        });

        if (appliedDiscountCode !== undefined) {
            setDiscountAmount((totalPrice * appliedDiscountCode.discountAmount).toFixed(2));
            setTotalPriceState(totalPrice * (1 - appliedDiscountCode.discountAmount));
        }

        setOriginalTotal(totalPrice);
        setSubtotal(totalPrice * .95);
        setTotalPriceState(totalPrice);
    }, [props.orderItems])

    useEffect(() => {
        if(allFormsValidated){

            const updatedOrder: OrderUpdate = {
                id: props.activeOrder,
                date: new Date().toLocaleDateString('hr-HR'),
                priceWithNoPdvIncluded: subtotal,
                total: totalPriceState,
                discountCodeId: appliedDiscountCode?.id,
                paymentMethod: 1,
                creditCardNumber: paymentInfo.cardNumber,
                email: shippingInfo.email,
                phoneNumber: shippingInfo.mobile,
                deliveryAddress: shippingInfo.street + ' ' + shippingInfo.unit + ' ' + shippingInfo.country + 
                ', ' + shippingInfo.region + ', ' + shippingInfo.city + ' ' + shippingInfo.postalCode,
                note: 'fwefwefewf',
            }
            console.log(updatedOrder);
            OrderService.updateOrder(updatedOrder).then(() => {
               setOrderUpdated(true); 
               props.orderCompleted(true);
            });
        }
    }, [allFormsValidated])

    useEffect(() => {
        if(orderUpdated){
            const timeoutId = setTimeout(() => {
                setOrderUpdated(false);
                navigate('/tech');
            }, 15000);
            return () => clearTimeout(timeoutId);
        }
    }, [orderUpdated]);

    return (
        <main className={style.main}>

            {orderUpdated ?
            <>
            <div className={style.order_successful}>
                <h2>Thank you for ordering!</h2>
                <p>Estitmated delivery time to your address is between &nbsp;
                    {dayOfDeliveryStart.toLocaleDateString('hr-HR').replaceAll(' ', '')}
                    &nbsp; and &nbsp;
                    {dayOfDeliveryEnd.toLocaleDateString('hr-HR').replaceAll(' ', '')}
                </p>
            </div>
            <p className={style.redirect}>You will be redirected to the main page shortly.</p>
            <FontAwesomeIcon className={style.icon_truck} icon={faTruckFast} />
            </>
            :
            <div className={style.main_container}>
            <div className={style.checkout_info}>
            <div className={style.checkout_info_title}>
                <h2>Checkout&nbsp;&nbsp;<FontAwesomeIcon icon={faCreditCard} className={style.h2_icon}/></h2>
            </div>
                <ShippingInfo validatedShippingInfo={setValidatedShippingInfo} shippingInfo={setShippingInfo}/>

                <PaymentInfo validatedPaymentInfo={setValidatedPaymentInfo} paymentInfo={setPaymentInfo}/>

                <div className={style.order_review_container}>
                    <div className={style.order_review_container_header}>
                        <p className={style.step_label}>Step 3 of 3</p>
                        <h3>Order Review</h3>
                    </div>

                    {props.orderItems.length == 0 &&
                        <div className={style.empty_order}>
                            <h4>No order items yet...</h4>
                        </div>
                    }
                    {props.orderItems?.map(item => {
                        return <OrderItem key={item.id} orderItem={item}
                            removeOrderItemAll={props.removeOrderItemAll} addOrRemoveOrderItem={props.addOrRemoveOrderItem} />;
                    })}
                </div>
            </div>

            <div className={style.order_info}>
                <div className={style.order_summary}>
                    <h3>Order Summary</h3>
                    <div className={style.p_container}>
                        <p>Subtotal</p> <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className={style.p_container_shipping}>
                        <p>Shipping fee</p> <p>Free</p>
                    </div>
                    <div className={style.p_container}>
                        <p>Est. taxes &amp; fees</p> <p>${(originalTotal - subtotal).toFixed(2)}</p>
                    </div>
                    <div className={style.p_container}>
                        <p>Coupon discount</p> <p>{discountUsed ? "-$" + discountAmount : "None"}</p>
                    </div>
                    <hr />
                    <div>
                        <input type="text" placeholder="Discount Code" onChange={handleInputChange} />
                        <button className={style.check_discount_button} onClick={checkDiscountCode}>Apply</button>
                        <Form.Control.Feedback type="invalid" style={{ display: errorDiscountMsg != '' ? "block" : "none" }}>
                            {errorDiscountMsg}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid" style={{ display: errorDiscountMsg == '' ? "block" : "none" }}>
                            {successDiscountMsg}
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className={style.p_container}>
                        <h4>TOTAL</h4> <h4><small id={style.small}>(USD) </small>${totalPriceState.toFixed(2)}</h4>
                    </div>

                    <Alert show={showAlert} variant="info">
                        <Alert.Heading>Can't place order yet!</Alert.Heading>
                        {props.orderItems.length > 0 ?
                        <p>
                        Please fill out all the necessary information in Shipping Information and Payment Method forms.
                        </p>
                        :
                        <p>
                        You haven't added any items to your shopping cart.
                        </p>
                        }
                        
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowAlert(false)} variant="outline-info">
                                Close
                            </Button>
                        </div>
                    </Alert>

                    {!showAlert && <button className={style.place_order_button} onClick={checkFormValidation}>Place Order</button>}
                </div>

                <FontAwesomeIcon className={style.icon} icon={faCreditCard} />
            </div>
        </div>
            }
                </main>
    );
}

export default Checkout;