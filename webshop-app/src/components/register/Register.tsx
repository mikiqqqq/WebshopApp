import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import style from './Register.module.css';
import { Button, FloatingLabel, Form as BootstrapForm } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorResponse400, UserRegisterForm } from '../MainContainerData';
import useElementaryAnimation from '../../hooks/useElementaryAnimation';

const Register: React.FC = () => {
    const navigate = useNavigate();
    useElementaryAnimation();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('*Full name is required'),
        email: Yup.string()
            .email('*Invalid email address')
            .required('*Email is required'),
        password: Yup.string()
            .min(5, '*Password must be at least 5 characters')
            .required('*Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], '*Passwords must match')
            .required('*Confirm password is required'),
    });

    const handleSubmit = async (values: UserRegisterForm, { setErrors }: any) => {
        try {
            const response = await UserService.register(values);
            if (response?.status === 200) {
                navigate('/login');
            }
        } catch (error: any) {
            if ('status' in error) {
                const status = error.status;
    
                if (status === 409) {
                    setErrors({
                        email: error.message || 'Email already taken'
                    });
                } else if (status === 400) {
                    const fieldErrors: Record<string, string> = { email: '', password: '' }; // Initialize with empty errors
                    const errorData = error.errors as ErrorResponse400;
                    
                    Object.keys(errorData).forEach((key) => {
                        fieldErrors[key] = errorData[key];
                    });
    
                    setErrors(fieldErrors);
                } else {
                    console.error('Register  error', error.message || 'An unknown error occurred');
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
            <div className={`${style.register_container} animated_content`} data-animation="elementScaleIn">
                <div className={`${style.register_heading} u-l1`}>Register</div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, isSubmitting }) => (
                        <FormikForm className={`${style.register_form} form`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div>
                                <FloatingLabel label="Full name">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="name"
                                        placeholder="Full name"
                                        onChange={handleChange}
                                        value={values.name}
                                        isInvalid={touched.name && !!errors.name}
                                        isValid={touched.name && !errors.name}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.name && touched.name ? "visible" : "hidden" }}>
                                        {errors.name}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel label="E-mail">
                                    <BootstrapForm.Control
                                        type="email"
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
                                    <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.password && touched.password ? "visible" : "hidden" }}>
                                        {errors.password}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel label="Confirm password">
                                    <BootstrapForm.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                    />
                                    <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.confirmPassword && touched.confirmPassword ? "visible" : "hidden" }}>
                                        {errors.confirmPassword}
                                    </BootstrapForm.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <Button type="submit" className={`${style.register_button} button_complementary u-pb1`} disabled={isSubmitting}>
                                Register
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
                <div className={style.login_upsell}>
                    <label className={`${style.login_label} u-p2`}>Already have an account?</label>
                    <Link to="/login" className={`${style.login_button} button_transparent u-p2`}>Log in</Link>
                </div>
            </div>
        </main>
    );
};

export default Register;