import React, { useEffect, useState } from "react";
import { Hit } from "../MainContainerData";
import style from "./Checkout.module.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import visa from '../../images/visa.png'
import maestro from '../../images/maestro.png'
import OrderItem from "../shopping_cart/order_item/OrderItem";

interface Props{
    orderItems: Hit[];
    activeOrder: number;
}

const Checkout:React.FunctionComponent<Props> = props => {
    let totalPrice: number = 0;
    const [validatedOne, setValidatedOne] = useState(false);
    const [validatedTwo, setValidatedTwo] = useState(false);
    const [card, setCard] = useState<string>("");

    const handleSubmitOne = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidatedOne(true);
    };

    const handleSubmitTwo = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidatedTwo(true);
    };

    const handleSetPayment = (card: string) => {
        setCard(card);
    }

    return(
        <main className={style.main}>
            <div className={style.main_container}>
                <div className={style.checkout_info}>
                    <h2>Checkout&nbsp;&nbsp;<FontAwesomeIcon icon={faCreditCard} /></h2>
                    <div className={style.step_one}>
                        <p className={style.step_p}>Step 1 of 3</p>
                        <h3>Shipping Information</h3>
                        <div className={style.contact}>
                            <Form noValidate validated={validatedOne} onSubmit={handleSubmitOne} id={style.form}>
                                <h5>Contact</h5>
                                <Row className="mb-2" id={style.row}>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01" id={style.col}>
                                        <FloatingLabel label="First Name">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="First name"
                                        />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <FloatingLabel label="Last name">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Last name"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="9" controlId="validationCustom02">
                                        <FloatingLabel label="E-mail">
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="E-mail"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="9" controlId="validationCustomUsername">
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">+365</InputGroup.Text>
                                            <FloatingLabel label="Mobile">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mobile"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            </FloatingLabel>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                                <h5>Address</h5>
                                <Row className="mb-2" id={style.row}>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01" id={style.col}>
                                        <FloatingLabel label="Street">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Street"
                                        />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <FloatingLabel label="Apartment, Unit, etc">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Apartment, Unit, etc"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <FloatingLabel label="Country">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Country"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <FloatingLabel label="State/Province/Region">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="State/Province/Region"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <FloatingLabel label="City">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="City"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <FloatingLabel label="Zip Code">
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="Zip Code"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button type="submit" id={style.submit_button}>Confirm</Button>
                            </Form>
                        </div>
                    </div>
                    
                    <div className={style.step_two}>
                        <p className={style.step_p}>Step 2 of 3</p>
                        <h3>Payment Methods</h3>
                            <div className={style.button_container}>
                                <button onClick={() => handleSetPayment("Visa")}
                                style={{borderBottom: card === 'Visa' ? "7.5px solid #7CFC00" : "none",
                                        backgroundColor: card === 'Visa' ? "#171a1f" : "transparent"}}>
                                    <img src={visa}></img>
                                </button>
                                <button onClick={() => handleSetPayment("Maestro")}
                                style={{borderBottom: card === 'Maestro' ? "7.5px solid #7CFC00" : "none",
                                        backgroundColor: card === 'Maestro' ? "#171a1f" : "transparent"}}>
                                    <img src={maestro}></img>
                                </button>
                                <div className={style.selected_card}>
                                    {card != '' ? card : 'Not Selected'}
                                </div>
                            </div>

                            <Form noValidate validated={validatedTwo} onSubmit={handleSubmitTwo} id={style.form_two}>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="9" controlId="validationCustom01">
                                        <FloatingLabel label="Cardholder Name">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Cardholder Name"
                                        />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="9" controlId="validationCustom02">
                                        <FloatingLabel label="Card Number">
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="Card Number"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <FloatingLabel label="Exp. day">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Expiry Day"
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                                        <FloatingLabel label="Exp. month">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Expiry Month"
                                        />
                                        </FloatingLabel>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                                        <InputGroup hasValidation>
                                            <FloatingLabel label="CVC">
                                            <Form.Control
                                                type="text"
                                                placeholder="CVC"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            </FloatingLabel>
                                            <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faCreditCard}/></InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Button type="submit" id={style.submit_button}>Confirm</Button>
                            </Form>
                    </div>

                    <div className={style.step_three}>
                        <div className={style.steph_three_header}>
                            <p className={style.step_p}>Step 3 of 3</p>
                            <h3>Order Review</h3>
                        </div>

                        {props.orderItems?.map(item => {
                            totalPrice += item.quantity * item.price;
                            return <OrderItem orderItem={item}/>;
                        })}
                    </div>
                </div>

                <div className={style.order_info}>
                    <div className={style.order_summary}>
                        <h3>Order Summary</h3>
                        <div className={style.p_container}>
                            <p>Subtotal</p> <p>${(totalPrice*0.95).toFixed(2)}</p>
                        </div>
                        <div className={style.p_container_shipping}>
                            <p>Shipping fee</p> <p>Free</p>
                        </div>
                        <div className={style.p_container}>
                            <p>Est. taxes &amp; fees</p> <p>${(totalPrice - (totalPrice*0.95)).toFixed(2)}</p>
                        </div>
                        <div className={style.p_container}>
                            <p>Coupon discount</p> <p>None</p>
                        </div>
                        <hr/>
                        <div>
                            <input type="text" placeholder="Discount Code"></input>
                            <button>Apply</button>
                        </div>
                        <hr/>
                        <div className={style.p_container}>
                            <h4>TOTAL</h4> <h4><small id={style.small}>(USD) </small>${totalPrice}</h4>
                        </div>
                        <Link className={style.place_order_button} to="/checkout">
                            Place Order
                        </Link>
                    </div>

                    <FontAwesomeIcon className={style.icon} icon={faCreditCard} />
                </div>
            </div>
        </main>
    );
}

export default Checkout;