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
import OrderReview from "./steps/OrderReview";
import OrderSummary from "./steps/OrderSummary";
import useElementaryAnimation from "../../hooks/useElementaryAnimation";

interface ExtendedOrderItemType extends OrderItemType {
    totalPrice: number;
}

const Checkout: React.FunctionComponent = () => {
    const navigate = useNavigate();
    useElementaryAnimation();
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
                        totalPrice: item.quantity * item.item.price
                    }));
                    setOrderItems(fetchedOrderItems);
                    const newTotalPriceSum = fetchedOrderItems.reduce((acc: any, item: { totalPrice: any; }) => acc + item.totalPrice, 0);
                    setTotalPrice(newTotalPriceSum);
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

    const handleRemoveItem = (id: number) => {
        const updatedOrderItems = orderItems.filter(item => item.id !== id);
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
    }, [appliedDiscountCode]);

    useEffect(() => {
        setOriginalTotal(totalPrice);
        setSubtotal(totalPrice * 0.95);
        setTotalPriceState(totalPrice);
    }, [totalPrice]);

    const checkFormValidation = () => {
        if (validatedShippingInfo && validatedPaymentInfo) {
            setAllFormsValidated(true);
        } else {
            setAllFormsValidated(false);
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (allFormsValidated) {
            const updatedOrder: OrderUpdate = {
                id: activeOrder,
                date: new Date().toLocaleString('hr-HR'),
                priceWithNoPdvIncluded: subtotal,
                total: totalPriceState,
                discountCodeId: appliedDiscountCode?.id,
                paymentMethod: paymentInfo.method === 'Card' ? 1 : 2,
                creditCardNumber: paymentInfo.cardNumber,
                email: shippingInfo.email,
                phoneNumber: shippingInfo.mobile,
                status: getRandomStatus(),
                deliveryAddress: `${shippingInfo.street} ${shippingInfo.unit} ${shippingInfo.country}, ${shippingInfo.region}, ${shippingInfo.city} ${shippingInfo.postalCode}`,
                note: '',
            };
            OrderService.updateOrder(updatedOrder).then(() => {
                setOrderUpdated(true);
                localStorage.setItem('activeOrder', '0');
            });
        }
    }, [allFormsValidated]);

    const getRandomStatus = () => {
        return Math.random() > 0.5 ? 'IN_PROGRESS' : 'COMPLETED';
      };      

    useEffect(() => {
        if (orderUpdated) {
            const timeoutId = setTimeout(() => {
                setOrderUpdated(false);
                navigate('/');
            }, 15000);
            return () => clearTimeout(timeoutId);
        }
    }, [orderUpdated]);

    return (
        <main className={`${style.main} form checkout`}>
            {orderUpdated ? (
                <>
                    <div className={style.order_successful}>
                        <div className={`${style.order_estimate} animated_content`} data-animation="elementFromBottom">
                            <div className="u-h1">Thank you for ordering!</div>
                            <p className="u-p2">Estimated delivery time to your address is between &nbsp;
                                {new Date(new Date().setDate(new Date().getDate() + 15)).toLocaleDateString('hr-HR')}
                                &nbsp; and &nbsp;
                                {new Date(new Date().setDate(new Date().getDate() + 18)).toLocaleDateString('hr-HR')}
                            </p>
                        </div>
                        <p className={`${style.redirect} u-s1 animated_content`} data-animation="elementFromBottom">You will be redirected to the main page shortly.</p>
                        <FontAwesomeIcon className={`${style.icon_truck} animated_content`} icon={faTruckFast} data-animation="elementScaleIn"/>
                    </div>
                </>
            ) : (
                <div className={style.main_container}>
                    <div className={`${style.checkout_info} animated_content`} data-animation="elementScaleIn" >
                        <div className={style.checkout_info_title}>
                            <div className={`${style.heading} u-h1`}>Checkout <FontAwesomeIcon icon={faCreditCard} className={`${style.h2_icon}`} /></div>
                        </div>
                        <ShippingInfo validatedShippingInfo={setValidatedShippingInfo} shippingInfo={setShippingInfo} />
                        <PaymentInfo validatedPaymentInfo={setValidatedPaymentInfo} paymentInfo={setPaymentInfo} />
                        <OrderReview orderItems={orderItems} handlePriceChange={handlePriceChange} onRemoveItem={handleRemoveItem} />
                    </div>

                    <div className={`${style.order_info} animated_content`} data-animation="elementFromRight">
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
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                        />

                        <FontAwesomeIcon className={`${style.icon} ${style.flip_animation}`} icon={faCreditCard} />
                    </div>
                </div>
            )}
        </main>
    );
}

export default Checkout;