import React, { useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel, InputGroup, Button } from "react-bootstrap";
import style from './PaymentInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Formik } from "formik";
import * as Yup from 'yup';

interface Props {
    validatedPaymentInfo(validated: boolean): void;
    paymentInfo(paymentInfo: any): void;
}

const PaymentInfo: React.FunctionComponent<Props> = props => {
    const [validated, setValidated] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("Card");

    const handleSetPayment = (method: string) => {
        setPaymentMethod(method);
        if (method === 'Cash') {
            props.validatedPaymentInfo(true);
            props.paymentInfo({ method: 'Cash' });
        }
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setValidated(false);
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [validated]);

    const re = /^[0-9\b]+$/;

    const validationSchema = Yup.object().shape({
        cardholderName: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        cardNumber: Yup.string()
            .matches(re, "*Card Number must be a number")
            .min(16, "*Card Number must have 16 digits")
            .max(16, "*Card Number must have 16 digits")
            .required("*Card Number is required"),
        expDay: Yup.string()
            .matches(re, "*Exp. day must be a number")
            .min(2, "*Exp. day must have 2 digits")
            .required("*Exp. day is required"),
        expMonth: Yup.string()
            .matches(re, "*Exp. month must be a number")
            .min(2, "*Exp. month must have 2 digits")
            .required("*Exp. month is required"),
        cvc: Yup.string()
            .matches(re, "*CVC must be a number")
            .min(3, "*CVC must have 3 digits")
            .required("*CVC is required"),
    });

    return (
        <div className={style.payment_info_container}>
            <p className={`${style.step_label} u-p2`}>Step 2 of 3</p>
            <div className={`${style.heading} u-h2`}>Payment methods</div>
            <div className={style.button_container}>
                <button 
                    onClick={() => handleSetPayment("Card")}
                    className={paymentMethod === 'Card' ? style.selected : ''}
                >
                    <FontAwesomeIcon icon={faCreditCard} />
                </button>
                <button 
                    onClick={() => handleSetPayment("Cash")}
                    className={paymentMethod === 'Cash' ? style.selected : ''}
                >
                    <FontAwesomeIcon icon={faCoins} />
                </button>
                <div className={`${style.selected_method} not_mobile u-h2`}>
                    {paymentMethod !== '' ? paymentMethod : 'Not Selected'}
                </div>
            </div>

            {paymentMethod === 'Card' ? (
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        setTimeout(() => {    
                            props.validatedPaymentInfo(true);
                            props.paymentInfo({ ...values, method: 'Card' });
                            setSubmitting(false);
                            setValidated(true);
                        }, 1000);
                    }}
                    initialValues={{
                        cardholderName: '',
                        cardNumber: '',
                        expDay: '',
                        expMonth: '',
                        cvc: ''
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                        isValid,
                        isSubmitting
                    }) => (
                        <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} id={style.form}>
                            <Row>
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <FloatingLabel label="Cardholder Name">
                                        <Form.Control
                                            type="text"
                                            name="cardholderName"
                                            placeholder="Cardholder Name"
                                            onChange={handleChange}
                                            value={values.cardholderName}
                                            isInvalid={touched.cardholderName && !!errors.cardholderName}
                                            isValid={touched.cardholderName && !errors.cardholderName}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.cardholderName && touched.cardholderName ? "visible" : "hidden" }}>
                                        {errors.cardholderName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} controlId="validationCustom02">
                                    <FloatingLabel label="Card Number">
                                        <Form.Control
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Card Number"
                                            maxLength={16}
                                            onChange={handleChange}
                                            value={values.cardNumber}
                                            isInvalid={touched.cardNumber && !!errors.cardNumber}
                                            isValid={touched.cardNumber && !errors.cardNumber}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.cardNumber && touched.cardNumber ? "visible" : "hidden" }}>
                                        {errors.cardNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} controlId="validationCustom03">
                                    <FloatingLabel label="Exp. day">
                                        <Form.Control
                                            type="text"
                                            name="expDay"
                                            placeholder="Expiry Day"
                                            maxLength={2}
                                            onChange={handleChange}
                                            value={values.expDay}
                                            isInvalid={touched.expDay && !!errors.expDay}
                                            isValid={touched.expDay && !errors.expDay}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.expDay && touched.expDay ? "visible" : "hidden" }}>
                                        {errors.expDay}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom04">
                                    <FloatingLabel label="Exp. month">
                                        <Form.Control
                                            type="text"
                                            name="expMonth"
                                            placeholder="Expiry Month"
                                            maxLength={2}
                                            onChange={handleChange}
                                            value={values.expMonth}
                                            isInvalid={touched.expMonth && !!errors.expMonth}
                                            isValid={touched.expMonth && !errors.expMonth}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.expMonth && touched.expMonth ? "visible" : "hidden" }}>
                                        {errors.expMonth}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom05">
                                    <InputGroup hasValidation>
                                        <FloatingLabel label="CVC">
                                            <Form.Control
                                                type="text"
                                                name="cvc"
                                                placeholder="CVC"
                                                maxLength={3}
                                                aria-describedby="inputGroupPrepend"
                                                onChange={handleChange}
                                                value={values.cvc}
                                                isInvalid={touched.cvc && !!errors.cvc}
                                                isValid={touched.cvc && !errors.cvc}
                                            />
                                        </FloatingLabel>
                                        <InputGroup.Text className={`${style.cvc_input} u-pb1`} id="inputGroupPrepend">
                                            <FontAwesomeIcon icon={faCreditCard} />
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.cvc && touched.cvc ? "visible" : "hidden" }}>
                                            {errors.cvc}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Form.Control.Feedback type="valid" style={{ visibility: validated && isValid ? "visible" : "hidden" }}>
                                Payment method set successfully.
                            </Form.Control.Feedback>
                            <Button type="submit" className={`${style.submit_button} button_complementary u-pb1`} disabled={isSubmitting}>
                                Confirm
                            </Button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className={`${style.cash_payment_container} u-p2`}>
                    <div className={`${style.cash_payment_message} u-p2`}>
                        You have selected to pay with cash.
                    </div>
                    <div className={`${style.cash_payment_message} u-p2`}>
                        Please have the exact amount ready upon delivery.
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentInfo;