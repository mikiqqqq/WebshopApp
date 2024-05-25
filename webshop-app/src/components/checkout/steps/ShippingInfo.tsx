import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, FloatingLabel, InputGroup, Button } from "react-bootstrap";
import style from './ShippingInfo.module.css';
import { Formik } from "formik";
import * as Yup from 'yup';
import { countries } from "./CountryData";

interface Props {
    validatedShippingInfo(validated: boolean): void;
    shippingInfo(shippingInfo: any): void;
}

export interface Countries {
    code: string
    code3: string
    name: string
    number: string
}

const ShippingInfo: React.FunctionComponent<Props> = props => {
    const [country, setCountry] = useState<number>(0);
    const countryRef = useRef<HTMLSelectElement | null | undefined>();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setValidated(false);
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [validated])

    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "*First name must have at least 2 characters")
            .max(100, "*First name can't be longer than 100 characters")
            .required("*First name is required"),
        lastName: Yup.string()
            .min(2, "*Last name must have at least 2 characters")
            .max(100, "*Last name can't be longer than 100 characters")
            .required("*Last name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        mobile: Yup.string()
            .matches(phoneRegExp, "*Phone number is not valid")
            .required("*Mobile is required"),
        street: Yup.string()
            .min(2, "*Street must have at least 2 characters")
            .max(100, "*Street must be less than 100 characters")
            .required("*Street is required"),
        region: Yup.string()
            .min(2, "*Region must have at least 2 characters")
            .required("*Region is required"),
        city: Yup.string()
            .min(2, "*City must have at least 2 characters")
            .required("*City is required"),
        postalCode: Yup.string()
            .min(2, "*Postal Code must have at least 2 characters")
            .required("*Postal Code is required"),
    });

    return (
        <div className={style.shipping_info_container}>
            <p className={style.step_lable}>Step 1 of 3</p>
            <h3>Shipping Information</h3>
            <div className={style.form_container}>

                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if(country == 0) {
                            setSubmitting(false);
                            return; 
                        }
                        setSubmitting(true);

                        setTimeout(() => {
                            props.validatedShippingInfo(true);
                            props.shippingInfo(values);
                            setSubmitting(false);
                            setValidated(true);
                        }, 1000);
                    }}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobile: '',
                        street: '',
                        unit: '',
                        country: '',
                        region: '',
                        city: '',
                        postalCode: ''
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
                            <h5>Contact</h5>
                            <Row className="mb-3" id={style.row}>
                                <Form.Group as={Col} sm="6" controlId="validationCustom01" id={style.col}>
                                    <FloatingLabel label="First Name">
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            isInvalid={touched.firstName && !!errors.firstName}
                                            isValid={touched.firstName && !errors.firstName}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.firstName && touched.firstName ? "block" : "none" }}>
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm="6" controlId="validationCustom02">
                                    <FloatingLabel label="Last Name">
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            isInvalid={touched.lastName && !!errors.lastName}
                                            isValid={touched.lastName && !errors.lastName}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.lastName && touched.lastName ? "block" : "none" }}>
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} sm="9" controlId="validationCustom03">
                                    <FloatingLabel label="E-mail">
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            onChange={handleChange}
                                            value={values.email}
                                            isInvalid={touched.email && !!errors.email}
                                            isValid={touched.email && !errors.email}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.email && touched.email ? "block" : "none" }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} sm="9" controlId="validationCustom04">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">+365</InputGroup.Text>
                                        <FloatingLabel label="Mobile">
                                            <Form.Control
                                                type="text"
                                                name="mobile"
                                                placeholder="Mobile"
                                                aria-describedby="inputGroupPrepend"
                                                onChange={handleChange}
                                                value={values.mobile}
                                                isInvalid={touched.mobile && !!errors.mobile}
                                                isValid={touched.mobile && !errors.mobile}
                                            />
                                        </FloatingLabel>
                                        <Form.Control.Feedback type="invalid" style={{ display: !!errors.mobile && touched.mobile ? "block" : "none" }}>
                                            {errors.mobile}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <h5>Address</h5>
                            <Row className="mb-3" id={style.row}>
                                <Form.Group as={Col} sm="6" controlId="validationCustom05" id={style.col}>
                                    <FloatingLabel label="Street">
                                        <Form.Control
                                            type="text"
                                            name="street"
                                            placeholder="Street"
                                            onChange={handleChange}
                                            value={values.street}
                                            isInvalid={touched.street && !!errors.street}
                                            isValid={touched.street && !errors.street}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.street && touched.street ? "block" : "none" }}>
                                        {errors.street}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm="6" controlId="validationCustom06">
                                    <FloatingLabel label="Apartment, Unit, etc">
                                        <Form.Control
                                            type="text"
                                            name="unit"
                                            placeholder="Apartment, Unit, etc"
                                            onChange={handleChange}
                                            value={values.unit}
                                            isInvalid={touched.unit && !!errors.unit}
                                            isValid={touched.unit && !errors.unit}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.unit && touched.unit ? "block" : "none" }}>
                                        {errors.unit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} sm="4" controlId="validationCustom07">
                                <Form.Select aria-label="country" id={style.select} defaultValue={''} onChange={() => setCountry(country + 1)}>
                                    <option value='' disabled>Select Country</option>
                                    {countries.map(country => {
                                        return <option key={country.code} value={country.code}>{country.name}</option>
                                    })}
                                </Form.Select>
                                    <Form.Control.Feedback type="invalid" style={{ display: country == 0 && touched.city ? "block" : "none" }}>
                                        *Country is required
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm="4" controlId="validationCustom08">
                                    <FloatingLabel label="State/Province/Region">
                                        <Form.Control
                                            type="text"
                                            name="region"
                                            placeholder="State/Province/Region"
                                            onChange={handleChange}
                                            value={values.region}
                                            isInvalid={touched.region && !!errors.region}
                                            isValid={touched.region && !errors.region}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.region && touched.region ? "block" : "none" }}>
                                        {errors.region}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm="4" controlId="validationCustom09">
                                    <FloatingLabel label="City">
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            onChange={handleChange}
                                            value={values.city}
                                            isInvalid={touched.city && !!errors.city}
                                            isValid={touched.city && !errors.city}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.city && touched.city ? "block" : "none" }}>
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} sm="6" controlId="validationCustom10">
                                    <FloatingLabel label="Postal Code">
                                        <Form.Control
                                            type="text"
                                            name="postalCode"
                                            placeholder="Postal Code"
                                            onChange={handleChange}
                                            value={values.postalCode}
                                            isInvalid={touched.postalCode && !!errors.postalCode}
                                            isValid={touched.postalCode && !errors.postalCode}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ display: !!errors.postalCode && touched.postalCode ? "block" : "none" }}>
                                        {errors.postalCode}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Control.Feedback type="valid" style={{ display: validated && isValid ? "block" : "none" }}>
                                    Shipping information updated successfully.
                            </Form.Control.Feedback>
                            <Button type="submit" id={style.submit_button} disabled={isSubmitting}>Confirm</Button>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );
}

export default ShippingInfo;