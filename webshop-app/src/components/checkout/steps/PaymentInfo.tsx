import React, { useState } from "react";
import { Form, Row, Col, FloatingLabel, InputGroup, Button } from "react-bootstrap";
import style from './PaymentInfo.module.css';
import visa from '../../../images/visa.png'
import maestro from '../../../images/maestro.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Formik } from "formik";
import * as Yup from 'yup';

interface Props {

}

const PaymentInfo: React.FunctionComponent<Props> = props => {
    const [validated, setValidated] = useState(false);
    const [card, setCard] = useState<string>("");


    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleSetPayment = (card: string) => {
        setCard(card);
    }

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
        <div className={style.step_two}>
            <p className={style.step_p}>Step 2 of 3</p>
            <h3>Payment Methods</h3>
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
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 500);
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
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isValid,
                    isSubmitting
                }) => (
                    <Form noValidate onSubmit={handleSubmit} id={style.form_two}>

                        <Row className="mb-2">
                            <Form.Group as={Col} md="9" controlId="validationCustom01">
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
                                <Form.Control.Feedback type="invalid" style={{display: !isValid && touched.cardholderName ? "block" : "none"}}>
                                    {errors.cardholderName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-2">
                            <Form.Group as={Col} md="9" controlId="validationCustom02">
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
                                <Form.Control.Feedback type="invalid" style={{display: !isValid && touched.cardNumber ? "block" : "none"}}>
                                    {errors.cardNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="3" controlId="validationCustom03">
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
                                <Form.Control.Feedback type="invalid" style={{display: !isValid && touched.expDay ? "block" : "none"}}>
                                    {errors.expDay}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom04">
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
                                <Form.Control.Feedback type="invalid" style={{display: !isValid && touched.expMonth ? "block" : "none"}}>
                                    {errors.expMonth}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom05">
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
                                    <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faCreditCard} /></InputGroup.Text>
                                    <Form.Control.Feedback type="invalid" style={{display: !isValid && touched.cvc ? "block" : "none"}}>
                                    {errors.cvc}
                                </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Button type="submit" id={style.submit_button} disabled={isSubmitting}>Confirm</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PaymentInfo;