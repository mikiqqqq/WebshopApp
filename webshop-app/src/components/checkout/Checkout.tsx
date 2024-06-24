import React, { useEffect, useState } from "react";
import { DiscountCode, OrderUpdate, OrderItemType } from "../MainContainerData";
import style from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import OrderItemService from "../../services/OrderItemService";
import OrderService from "../../services/OrderService";
import ShippingInfo from "./steps/ShippingInfo";
import PaymentInfo from "./steps/PaymentInfo";
import { Alert, Button } from "react-bootstrap";
import OrderReview from "./steps/OrderReview";
import OrderSummary from "./steps/OrderSummary";

interface Props {
    orderCompleted(orderCompleted: boolean): void;
}

interface ExtendedOrderItemType extends OrderItemType {
    totalPrice: number;
}

const Checkout: React.FunctionComponent<Props> = ({ orderCompleted }) => {
    const navigate = useNavigate();
    const activeOrder = Number(localStorage.getItem('activeOrder'));
    const [orderItems, setOrderItems] = useState<ExtendedOrderItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalPriceState, setTotalPriceState] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const [appliedDiscountCode, setAppliedDiscountCode] = useState<DiscountCode>();
    const [discountAmount, setDiscountAmount] = useState('0');
    const [discountUsed, setDiscountUsed] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [allFormsValidated, setAllFormsValidated] = useState(false);
    const [validatedShippingInfo, setValidatedShippingInfo] = useState(false);
    const [validatedPaymentInfo, setValidatedPaymentInfo] = useState(false);
    const [shippingInfo, setShippingInfo] = useState<any>();
    const [paymentInfo, setPaymentInfo] = useState<any>();
    const [orderUpdated, setOrderUpdated] = useState(false);

    useEffect(() => {
        const fetchOrderItems = async () => {
            if (activeOrder) {
                try {
                    const response = await OrderItemService.fetchAllByOrderId(activeOrder);
                    const fetchedOrderItems = response.data.map((item: OrderItemType) => ({
                        ...item,
                        totalPrice: 0 // Initialize with zero, will be updated by OrderItem component
                    }));
                    setOrderItems(fetchedOrderItems);
                } catch (error) {
                    console.error("Error fetching order items:", error);
                }
            } else {
                setOrderItems([]);
                setTotalPrice(0);
            }
        };

        fetchOrderItems();
    }, [activeOrder]);

    const handlePriceChange = (id: number, newTotalPrice: number) => {
        const updatedOrderItems = orderItems.map(item =>
            item.id === id ? { ...item, totalPrice: newTotalPrice } : item
        );
        setOrderItems(updatedOrderItems);
        const newTotalPriceSum = updatedOrderItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotalPrice(newTotalPriceSum);
    };

    useEffect(() => {
        if (appliedDiscountCode?.active) {
            setTotalPriceState(totalPriceState * (1 - appliedDiscountCode.discountAmount));
            setDiscountAmount((totalPriceState * appliedDiscountCode.discountAmount).toFixed(2));
            setDiscountUsed(true);
        }
    }, [appliedDiscountCode])

    useEffect(() => {
        if (appliedDiscountCode !== undefined) {
            setDiscountAmount((totalPrice * appliedDiscountCode.discountAmount).toFixed(2));
            setTotalPriceState(totalPrice * (1 - appliedDiscountCode.discountAmount));
        }

        setOriginalTotal(totalPrice);
        setSubtotal(totalPrice * .95);
        setTotalPriceState(totalPrice);
    }, [orderItems]);

    const checkFormValidation = () => {
        if (validatedShippingInfo && validatedPaymentInfo) {
            setAllFormsValidated(true);
        } else {
            setAllFormsValidated(false);
            setShowAlert(true);
        }
    }

    useEffect(() => {
        if (allFormsValidated) {
            const updatedOrder: OrderUpdate = {
                id: activeOrder,
                date: new Date().toLocaleDateString('hr-HR'),
                priceWithNoPdvIncluded: subtotal,
                total: totalPriceState,
                discountCodeId: appliedDiscountCode?.id,
                paymentMethod: 1,
                creditCardNumber: paymentInfo.cardNumber,
                email: shippingInfo.email,
                phoneNumber: shippingInfo.mobile,
                deliveryAddress: `${shippingInfo.street} ${shippingInfo.unit} ${shippingInfo.country}, ${shippingInfo.region}, ${shippingInfo.city} ${shippingInfo.postalCode}`,
                note: 'fwefwefewf',
            };
            OrderService.updateOrder(updatedOrder).then(() => {
                setOrderUpdated(true);
                orderCompleted(true);
            });
        }
    }, [allFormsValidated]);

    useEffect(() => {
        if (orderUpdated) {
            const timeoutId = setTimeout(() => {
                setOrderUpdated(false);
                navigate('/tech');
            }, 15000);
            return () => clearTimeout(timeoutId);
        }
    }, [orderUpdated]);

    return (
        <main className={style.main}>
            {orderUpdated ? (
                <>
                    <div className={style.order_successful}>
                        <h2>Thank you for ordering!</h2>
                        <p>Estimated delivery time to your address is between &nbsp;
                            {new Date(new Date().setDate(new Date().getDate() + 15)).toLocaleDateString('hr-HR')}
                            &nbsp; and &nbsp;
                            {new Date(new Date().setDate(new Date().getDate() + 18)).toLocaleDateString('hr-HR')}
                        </p>
                    </div>
                    <p className={style.redirect}>You will be redirected to the main page shortly.</p>
                    <FontAwesomeIcon className={style.icon_truck} icon={faTruckFast} />
                </>
            ) : (
                <div className={style.main_container}>
                    <div className={style.checkout_info}>
                        <div className={style.checkout_info_title}>
                            <h2>Checkout&nbsp;&nbsp;<FontAwesomeIcon icon={faCreditCard} className={style.h2_icon} /></h2>
                        </div>
                        <ShippingInfo validatedShippingInfo={setValidatedShippingInfo} shippingInfo={setShippingInfo} />
                        <PaymentInfo validatedPaymentInfo={setValidatedPaymentInfo} paymentInfo={setPaymentInfo} />
                        <OrderReview orderItems={orderItems} handlePriceChange={handlePriceChange} />
                    </div>

                    <div className={style.order_info}>
                        <OrderSummary
                            subtotal={subtotal}
                            originalTotal={originalTotal}
                            discountAmount={discountAmount}
                            totalPriceState={totalPriceState}
                            setTotalPriceState={setTotalPriceState}
                            setDiscountUsed={setDiscountUsed}
                            appliedDiscountCode={appliedDiscountCode}
                            setAppliedDiscountCode={setAppliedDiscountCode}
                            setDiscountAmount={setDiscountAmount}
                            discountUsed={discountUsed}
                            checkFormValidation={checkFormValidation}
                        />

                        <Alert show={showAlert} variant="info">
                            <Alert.Heading>Can't place order yet!</Alert.Heading>
                            {orderItems.length > 0 ? (
                                <p>
                                    Please fill out all the necessary information in Shipping Information and Payment Method forms.
                                </p>
                            ) : (
                                <p>
                                    You haven't added any items to your shopping cart.
                                </p>
                            )}
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShowAlert(false)} variant="outline-info">Close</Button>
                            </div>
                        </Alert>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Checkout;