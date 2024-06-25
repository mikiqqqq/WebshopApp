import React, { useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel, InputGroup, Button } from "react-bootstrap";
import style from './PaymentInfo.module.css';
import visa from '../../../images/visa.png'
import maestro from '../../../images/maestro.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Formik } from "formik";
import * as Yup from 'yup';

interface Props {
    validatedPaymentInfo(validated: boolean): void;
    paymentInfo(paymentInfo: any): void;
}

const PaymentInfo: React.FunctionComponent<Props> = props => {
    const [validated, setValidated] = useState(false);
    const [card, setCard] = useState<string>("");

    const handleSetPayment = (card: string) => {
        setCard(card);
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setValidated(false);
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [validated])

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
            .min(2, "*Exp. day must 2 digits")
            .required("*Expiration day is required"),
        expMonth: Yup.string()
            .matches(re, "*Exp. month must be a number")
            .min(2, "*Exp. month must 2 digits")
            .required("*Expiration month is required"),
        cvc: Yup.string()
            .matches(re, "*CVC must be a number")
            .min(3, "*CVC must have 3 digits")
            .required("*CVC is required"),
    });

    return (
        <div className={style.payment_info_container}>
            <p className={`${style.step_lable} u-p2`}>Step 2 of 3</p>
            <div className={`${style.heading} u-h2`}>Payment methods</div>
            <div className={style.button_container}>
                <button onClick={() => handleSetPayment("Visa")}
                    style={{
                        borderBottom: card === 'Visa' ? "7.5px solid #7CFC00" : "none",
                        backgroundColor: card === 'Visa' ? "#171a1f" : "transparent"
                    }}>
                    <img src={visa} alt="Visa"></img>
                </button>
                <button onClick={() => handleSetPayment("Maestro")}
                    style={{
                        borderBottom: card === 'Maestro' ? "7.5px solid #7CFC00" : "none",
                        backgroundColor: card === 'Maestro' ? "#171a1f" : "transparent"
                    }}>
                    <img src={maestro} alt="Maestro"></img>
                </button>
                <div className={style.selected_card}>
                    {card !== '' ? card : 'Not Selected'}
                </div>
            </div>

            <Formik
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);

                    // Simulate submitting to database, shows us values submitted, resets form
                  setTimeout(() => {    
                    props.validatedPaymentInfo(true);
                    props.paymentInfo(values);
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
                    <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e)}} id={style.form}>

                        <Row >
                            <Form.Group as={Col}  controlId="validationCustom01">
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

                        <Row >
                            <Form.Group as={Col}  controlId="validationCustom02">
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

                        <Row >
                            <Form.Group as={Col}  controlId="validationCustom03">
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

                            <Form.Group as={Col}  controlId="validationCustom04">
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

                            <Form.Group as={Col}  controlId="validationCustom05">
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
                                    <InputGroup.Text className={`${style.cvc_input} u-pb1`} id="inputGroupPrepend"><FontAwesomeIcon icon={faCreditCard} /></InputGroup.Text>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.cvc && touched.cvc ? "visible" : "hidden" }}>
                                        {errors.cvc}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Form.Control.Feedback type="valid" style={{ display: validated && isValid  ? "block" : "none" }}>
                                Payment method set successfully.
                        </Form.Control.Feedback>
                        <Button type="submit" className={`${style.submit_button} button_complementary u-pb1`} disabled={isSubmitting}>
                            Confirm
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PaymentInfo;