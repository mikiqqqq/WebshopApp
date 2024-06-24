import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DiscountCode } from '../../MainContainerData';
import style from './OrderSummary.module.css';
import DiscountCodeService from '../../../services/DiscountCodeService';

interface Props {
    subtotal: number;
    originalTotal: number;
    discountAmount: string;
    totalPriceState: number;
    setTotalPriceState: React.Dispatch<React.SetStateAction<number>>;
    setDiscountUsed: React.Dispatch<React.SetStateAction<boolean>>;
    appliedDiscountCode: DiscountCode | undefined;
    setAppliedDiscountCode: React.Dispatch<React.SetStateAction<DiscountCode | undefined>>;
    setDiscountAmount: React.Dispatch<React.SetStateAction<string>>;
    discountUsed: boolean;
    checkFormValidation: () => void;
}

const OrderSummary: React.FC<Props> = ({
    subtotal,
    originalTotal,
    discountAmount,
    totalPriceState,
    setTotalPriceState,
    setDiscountUsed,
    appliedDiscountCode,
    setAppliedDiscountCode,
    setDiscountAmount,
    discountUsed,
    checkFormValidation
}) => {
    const [discountInputValue, setDiscountInputValue] = useState('');
    const [errorDiscountMsg, setErrorDiscountMsg] = useState('');
    const [successDiscountMsg, setSuccessDiscountMsg] = useState('');

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
            const discountCode = (await DiscountCodeService.checkDiscountCode(discountInputValue)).data;

            if (!discountCode.code) {
                setErrorDiscountMsg('Discount Code you entered is invalid!');
                return;
            }
            if (!discountCode.active) {
                setErrorDiscountMsg('Discount Code you entered is not active anymore!');
                return;
            }

            setAppliedDiscountCode(discountCode);
            setErrorDiscountMsg('');
            setSuccessDiscountMsg('You successfully applied your discount code!');
        } else {
            setErrorDiscountMsg('You cannot enter more than 2 discount codes.');
        }
    }

    return (
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
                <Form.Control.Feedback type="invalid" style={{ display: errorDiscountMsg !== '' ? "block" : "none" }}>
                    {errorDiscountMsg}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid" style={{ display: successDiscountMsg !== '' ? "block" : "none" }}>
                    {successDiscountMsg}
                </Form.Control.Feedback>
            </div>
            <hr />
            <div className={style.p_container}>
                <h4>TOTAL</h4> <h4><small id={style.small}>(USD) </small>${totalPriceState.toFixed(2)}</h4>
            </div>
            <Button className={style.place_order_button} onClick={checkFormValidation}>Place Order</Button>
        </div>
    );
};

export default OrderSummary;