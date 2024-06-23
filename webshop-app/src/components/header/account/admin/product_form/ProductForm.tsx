import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Product, BrandType, ProductType } from '../../../../MainContainerData';
import ItemService from '../../../../../services/ItemService';
import style from './ProductForm.module.css';
import { Button, FloatingLabel, Form as BootstrapForm } from 'react-bootstrap';
import image_placeholder from '../../../../../images/image_placeholder.gif'

interface ProductFormProps {
    form: Product;
    brands: BrandType[];
    productTypes: ProductType[];
    handleResetForm: () => void;
    fetchProducts: () => void; // Function to trigger re-fetching products
}

const ProductForm: React.FC<ProductFormProps> = ({ form, brands, productTypes, handleResetForm, fetchProducts }) => {
    const initialValues = form;
    const [previewUrl, setPreviewUrl] = useState<string | null>(form.image ? URL.createObjectURL(form.image) : null);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
        quantity: Yup.number().required('Quantity is required').min(0, 'Quantity must be a positive number'),
        brandId: Yup.number().required('Brand is required'),
        typeId: Yup.number().required('Type is required'),
        productionYear: Yup.number().required('Production year is required').min(1900, 'Year must be after 1900').max(new Date().getFullYear(), `Year must be before ${new Date().getFullYear() + 1}`),
        image: Yup.mixed().required('Image is required')
    });

    const handleSubmit = async (values: Product, { setSubmitting, resetForm }: any) => {
        try {
            await ItemService.addItem(values);
            fetchProducts(); // Trigger re-fetching products in ProductTable
            resetForm(); // Reset Formik form
            handleResetForm(); // Reset local form state
        } catch (error) {
            console.error('Error saving product', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await ItemService.removeItem(id);
            fetchProducts(); // Trigger re-fetching products in ProductTable
            handleResetForm(); // Reset local form state
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            setFieldValue("image", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
                <FormikForm className={`${style.product_form} form`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="mb-3">
                        <img
                            src={previewUrl || image_placeholder}
                            alt="Product"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                    <div>
                        <BootstrapForm.Group controlId="formFile" className="mb-3">
                            <BootstrapForm.Label>Product Image</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="file"
                                onChange={(event) => handleImageChange(event as React.ChangeEvent<HTMLInputElement>, setFieldValue)}
                                isInvalid={touched.image && !!errors.image}
                                isValid={touched.image && !errors.image}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.image && touched.image ? "visible" : "hidden" }}>
                                {errors.image}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </div>
                    <div>
                        <FloatingLabel label="Title">
                            <BootstrapForm.Control
                                type="text"
                                name="title"
                                placeholder="Title"
                                onChange={handleChange}
                                value={values.title}
                                isInvalid={touched.title && !!errors.title}
                                isValid={touched.title && !errors.title}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.title && touched.title ? "visible" : "hidden" }}>
                                {errors.title}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Description">
                            <BootstrapForm.Control
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={values.description}
                                isInvalid={touched.description && !!errors.description}
                                isValid={touched.description && !errors.description}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.description && touched.description ? "visible" : "hidden" }}>
                                {errors.description}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Price">
                            <BootstrapForm.Control
                                type="number"
                                name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                value={values.price}
                                isInvalid={touched.price && !!errors.price}
                                isValid={touched.price && !errors.price}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.price && touched.price ? "visible" : "hidden" }}>
                                {errors.price}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Quantity">
                            <BootstrapForm.Control
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                onChange={handleChange}
                                value={values.quantity}
                                isInvalid={touched.quantity && !!errors.quantity}
                                isValid={touched.quantity && !errors.quantity}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.quantity && touched.quantity ? "visible" : "hidden" }}>
                                {errors.quantity}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Brand">
                            <BootstrapForm.Select
                                name="brandId"
                                onChange={handleChange}
                                value={values.brandId}
                                isInvalid={touched.brandId && !!errors.brandId}
                                isValid={touched.brandId && !errors.brandId}
                            >
                                <option value="">Select a brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </BootstrapForm.Select>
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.brandId && touched.brandId ? "visible" : "hidden" }}>
                                {errors.brandId}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Type">
                            <BootstrapForm.Select
                                name="typeId"
                                onChange={handleChange}
                                value={values.typeId}
                                isInvalid={touched.typeId && !!errors.typeId}
                                isValid={touched.typeId && !errors.typeId}
                            >
                                <option value="">Select a type</option>
                                {productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </BootstrapForm.Select>
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.typeId && touched.typeId ? "visible" : "hidden" }}>
                                {errors.typeId}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Production Year">
                            <BootstrapForm.Control
                                type="number"
                                name="productionYear"
                                placeholder="Production Year"
                                onChange={handleChange}
                                value={values.productionYear}
                                isInvalid={touched.productionYear && !!errors.productionYear}
                                isValid={touched.productionYear && !errors.productionYear}
                            />
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.productionYear && touched.productionYear ? "visible" : "hidden" }}>
                                {errors.productionYear}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <Button type="submit" className={style.product_button} disabled={isSubmitting}>
                        {form.id ? 'Update Product' : 'Add Product'}
                    </Button>
                    {form.id && (
                        <Button type="button" onClick={() => handleDelete(form.id)} disabled={isSubmitting} className={style.product_button}>
                            Delete
                        </Button>
                    )}
                </FormikForm>
            )}
        </Formik>
    );
};

export default ProductForm;