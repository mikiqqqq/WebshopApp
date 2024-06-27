import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { DiscountCode } from '../../MainContainerData';
import style from './OrderSummary.module.css';
import DiscountCodeService from '../../../services/DiscountCodeService';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

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
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
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
    checkFormValidation,
    showAlert,
    setShowAlert
}) => {
    const [successDiscountMsg, setSuccessDiscountMsg] = useState('');
    const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Flag for discount application
    const alertRef = useRef<HTMLDivElement>(null);

    const validationSchema = Yup.object().shape({
        discountCode: Yup.string()
            .min(10, 'Code must be longer than 10 characters')
            .required('Code is required')
    });

    const checkDiscountCode = async (discountCode: string) => {
        setSuccessDiscountMsg('');
        const discountCodeData = (await DiscountCodeService.checkDiscountCode(discountCode)).data;

        if (!discountCodeData.code) {
            throw new Error('Code you entered is invalid');
        }
        if (!discountCodeData.active) {
            throw new Error('Code you entered is not active anymore');
        }

        setAppliedDiscountCode(discountCodeData);
        setSuccessDiscountMsg('You successfully applied your discount!');
        setIsDiscountApplied(true); // Set the flag to true
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
            setShowAlert(false);
        }
    }, [setShowAlert]);

    const handleFocusOutside = useCallback((event: FocusEvent) => {
        if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
            setShowAlert(false);
        }
    }, [setShowAlert]);

    useEffect(() => {
        if (showAlert) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("focusin", handleFocusOutside);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // Close the alert after 5 seconds

            return () => {
                clearTimeout(timer);
            };
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("focusin", handleFocusOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("focusin", handleFocusOutside);
        };
    }, [showAlert, handleClickOutside, handleFocusOutside]);

    useEffect(() => {
        if (appliedDiscountCode) {
            const discount = originalTotal * appliedDiscountCode.discountAmount;
            setDiscountAmount(discount.toFixed(2));
            setTotalPriceState(originalTotal - discount);
        } else {
            setTotalPriceState(originalTotal);
        }
    }, [appliedDiscountCode, originalTotal, setDiscountAmount, setTotalPriceState]);

    return (
        <div className={style.order_summary}>
            <div className={`${style.heading} u-h1`}>Order Summary</div>
            <div className={`${style.price_details} u-p2 rte`}>
                <div className={style.p_container}>
                    <p>Subtotal</p> <p>€ {subtotal.toFixed(2)}</p>
                </div>
                <div className={style.p_container_shipping}>
                    <p>Shipping fee</p> <p>Free</p>
                </div>
                <div className={style.p_container}>
                    <p>Est. taxes &amp; fees</p> <p>€ {(originalTotal - subtotal).toFixed(2)}</p>
                </div>
                <div className={style.p_container}>
                    <p>Coupon discount</p> <p>{discountUsed ? "-€ " + discountAmount : "None"}</p>
                </div>
            </div>
            <Formik
                initialValues={{ discountCode: '' }}
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting, setErrors, setTouched }) => {
                    if (!isDiscountApplied) { // Prevent further validation if discount is applied
                        setSubmitting(true);
                        setTouched({ discountCode: true }); // Manually set touched on submit
                        try {
                            await checkDiscountCode(values.discountCode);
                            setDiscountUsed(true);
                        } catch (error) {
                            setErrors({ discountCode: (error as Error).message });
                        } finally {
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ isSubmitting, errors, touched, handleSubmit }) => (
                    <FormikForm placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className={`${style.discount_form} discount_code`}>
                            <Form.Group controlId="discountCode">
                                <FloatingLabel label="Discount code">
                                    <Field
                                        type="text"
                                        name="discountCode"
                                        placeholder="Discount Code"
                                        className={`form-control ${touched.discountCode && errors.discountCode ? 'is-invalid' : ''}`}
                                        disabled={isDiscountApplied} // Disable field if discount is applied
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ visibility: errors.discountCode && touched.discountCode ? "visible" : "hidden" }}>
                                        {errors.discountCode}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            {successDiscountMsg && (
                                <div className="valid-feedback" style={{ display: 'block' }}>
                                    {successDiscountMsg}
                                </div>
                            )}
                            <Button 
                                className={`${style.check_discount_button} button_complementary u-pb1`} 
                                type="submit" 
                                disabled={isSubmitting || isDiscountApplied} // Disable button if discount is applied
                            >
                                Apply
                            </Button>       
                        </div>
                    </FormikForm>
                )}
            </Formik>

            <div className={style.p_container}>
                <span className={`${style.total_price} u-h2`}>TOTAL</span> <span className={`${style.total_price} u-h2`}><small id={style.small}>(EUR) </small>€ {totalPriceState.toFixed(2)}</span>
            </div>
            <Button className={`${style.place_order_button} button_complementary u-pb1`} onClick={checkFormValidation}>
                Place Order
            </Button>        

            <Alert tabIndex={-1} id={style.alert} ref={alertRef} show={showAlert} variant="info" onClose={() => setShowAlert(false)}>
                <Alert.Heading className={`u-h3`}>Can't place order yet!</Alert.Heading>
                <p>
                    Please fill out all the necessary information in shipping information and payment method forms.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button className={`u-pb1`} onClick={() => setShowAlert(false)} variant="outline-info">
                        Close
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

export default OrderSummary;