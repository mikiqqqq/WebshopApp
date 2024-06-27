import React, { useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel, InputGroup, Button } from "react-bootstrap";
import style from './ShippingInfo.module.css';
import { Formik } from "formik";
import * as Yup from 'yup';
import { countries } from "./CountryData";
interface Props {
    validatedShippingInfo(validated: boolean): void;
    shippingInfo(shippingInfo: any): void;
}

const ShippingInfo: React.FunctionComponent<Props> = props => {
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setValidated(false);
        }, 5000);
        return () => clearTimeout(timeoutID);
    }, [validated]);

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
        country: Yup.string()
            .required("*Country is required"),
    });

    return (
        <div className={style.shipping_info_container}>
            <p className={`${style.step_label} u-p2`}>Step 1 of 3</p>
            <div className={`${style.heading} u-h2`}>Shipping information</div>
            <div className={style.form_container}>
    
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
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
                        country: 'HR', // Set Croatia as the default country
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
                        <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} id={style.form}>
                            <div className={`${style.subheading} u-p1`}>Contact</div>
                            <Row id={style.row}>
                                <Form.Group as={Col} controlId="validationCustom01" id={style.col}>
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.firstName && touched.firstName ? "visible" : "hidden" }}>
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="validationCustom02">
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.lastName && touched.lastName ? "visible" : "hidden" }}>
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
    
                            <Row>
                                <Form.Group as={Col} controlId="validationCustom03">
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.email && touched.email ? "visible" : "hidden" }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
    
                            <Row>
                                <Form.Group as={Col} controlId="validationCustom04">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text className={`${style.mobile_input} u-pb1`} id="inputGroupPrepend">+385</InputGroup.Text>
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
                                        <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.mobile && touched.mobile ? "visible" : "hidden" }}>
                                            {errors.mobile}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
    
                            <div className={`${style.subheading} u-p1`}>Address</div>
                            <Row id={style.row}>
                                <Form.Group as={Col} controlId="validationCustom05" id={style.col}>
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.street && touched.street ? "visible" : "hidden" }}>
                                        {errors.street}
                                    </Form.Control.Feedback>
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="validationCustom06">
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.unit && touched.unit ? "visible" : "hidden" }}>
                                        {errors.unit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
    
                            <Row>
                                <Form.Group as={Col} controlId="validationCustom07" className="form-floating">
                                    <FloatingLabel aria-label="Country" label="Country">
                                        <Form.Select
                                            name="country"
                                            id={style.select}
                                            onChange={handleChange}
                                            value={values.country}
                                            isInvalid={touched.country && !!errors.country}
                                            isValid={touched.country && !errors.country}
                                        >
                                            <option value='' disabled>Select Country</option>
                                            {countries.map(country => {
                                                return <option key={country.code} value={country.code}>{country.name}</option>
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.country && touched.country ? "visible" : "hidden" }}>
                                            {errors.country}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="validationCustom08">
                                    <FloatingLabel label="Province/Region">
                                        <Form.Control
                                            type="text"
                                            name="region"
                                            placeholder="Province/Region"
                                            onChange={handleChange}
                                            value={values.region}
                                            isInvalid={touched.region && !!errors.region}
                                            isValid={touched.region && !errors.region}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.region && touched.region ? "visible" : "hidden" }}>
                                        {errors.region}
                                    </Form.Control.Feedback>
                                </Form.Group>
    
                                <Form.Group as={Col} controlId="validationCustom09">
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.city && touched.city ? "visible" : "hidden" }}>
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
    
                            <Row>
                                <Form.Group as={Col} controlId="validationCustom10">
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
                                    <Form.Control.Feedback type="invalid" style={{ visibility: !!errors.postalCode && touched.postalCode ? "visible" : "hidden" }}>
                                        {errors.postalCode}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
    
                            <Form.Control.Feedback type="valid" style={{ visibility: validated && isValid ? "visible" : "hidden" }}>
                                Shipping information updated successfully.
                            </Form.Control.Feedback>
                            <Button type="submit" className={`${style.submit_button} button_complementary u-pb1`} disabled={isSubmitting}>
                                Confirm
                            </Button>
                        </Form>
                    )}
                </Formik>
    
            </div>
        </div>
    );    
}

export default ShippingInfo;