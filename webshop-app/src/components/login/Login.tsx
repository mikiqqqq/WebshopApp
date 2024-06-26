import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import style from './Login.module.css';
import { Button, FloatingLabel, Form as BootstrapForm } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {  ErrorResponse400 } from '../MainContainerData';
import useElementaryAnimation from '../../hooks/useElementaryAnimation';

const Login: React.FC = () => {
    const navigate = useNavigate();
    useElementaryAnimation();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('*Invalid email address')
            .required('*Email is required'),
        password: Yup.string()
            .min(5, '*Password must be at least 5 characters')
            .required('*Password is required'),
    });

    const handleSubmit = async (values: { email: string; password: string }, { setErrors }: any) => {
        try {
            const response = await UserService.login(values);
            if (response?.status === 200) {
                navigate('/account');
            }
        } catch (error: any) {
            if ('status' in error) {
                const status = error.status;
    
                if (status === 404) {
                    setErrors({
                        email: ' ', // Setting an error on email
                        password: error.message || 'Record not found' // Displaying the message under password
                    });
                } else if (status === 400) {
                    const fieldErrors: Record<string, string> = { email: '', password: '' }; // Initialize with empty errors
                    const errorData = error.errors as ErrorResponse400;
                    
                    Object.keys(errorData).forEach((key) => {
                        fieldErrors[key] = errorData[key];
                    });
    
                    setErrors(fieldErrors);
                } else {
                    console.error('Login error', error.message || 'An unknown error occurred');
                }
            } else if (error instanceof Error) {
                console.error('Login error', error.message);
            } else {
                console.error('Login error', error);
            }
        }
    };

    return (
        <main className="main">
            <div className={`${style.login_container} animated_content`} data-animation="elementScaleIn">
                <div className={`${style.login_heading} u-l1`}>Login</div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, isSubmitting }) => (
                        <FormikForm className={`${style.login_form} form`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div>
                                <FloatingLabel label="E-mail">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="email"
                                        placeholder="E-mail"
                                        onChange={handleChange}
                                        value={values.email}
                                        isInvalid={touched.email && !!errors.email}
                                        isValid={touched.email && !errors.email}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.email && touched.email ? "visible" : "hidden" }}>
                                        {errors.email}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel label="Password">
                                    <BootstrapForm.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={values.password}
                                        isInvalid={touched.password && !!errors.password}
                                        isValid={touched.password && !errors.password}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.email && touched.email ? "visible" : "hidden" }}>
                                        {errors.password}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <Button type="submit" className={`${style.login_button} button_complementary u-pb1`} disabled={isSubmitting}>
                                Log in
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
                <div className={style.register_upsell}>
                    <label className={`${style.register_label} u-p2`}>Don't have an account?</label>
                    <Link to="/register" className={`${style.register_button} button_transparent u-p2`}>Sign up</Link>
                </div>
            </div>
        </main>
    );
};

export default Login;