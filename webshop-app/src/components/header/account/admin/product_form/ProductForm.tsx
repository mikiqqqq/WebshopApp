import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Product, BrandType, ProductType } from '../../../../MainContainerData';
import ItemService from '../../../../../services/ItemService';
import style from './ProductForm.module.css';
import { Button, FloatingLabel, Form as BootstrapForm } from 'react-bootstrap';
import image_placeholder from '../../../../../images/image_placeholder.gif';
import BrandService from '../../../../../services/BrandService';
import ProductTypeService from '../../../../../services/ProductTypeService';
import useElementaryAnimation from '../../../../../hooks/useElementaryAnimation';

interface ProductFormProps {
    form: Product;
    handleResetForm: () => void;
    fetchProducts: () => void; // Function to trigger re-fetching products
}

const ProductForm: React.FC<ProductFormProps> = ({ form, handleResetForm, fetchProducts }) => {
    const initialValues = form;
    const [previewUrl, setPreviewUrl] = useState<string | null>(form.image ? form.image : null);
    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [productTypes, setProductTypes] = useState<Array<ProductType>>([]);
    useElementaryAnimation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number()
            .required('Price is required')
            .moreThan(0, 'Price must be greater than 0')
            .typeError('Price must be a number'),
        quantity: Yup.number()
            .required('Quantity is required')
            .min(0, 'Quantity must be a positive number')
            .typeError('Quantity must be a number'),
        brand: Yup.object().shape({
            id: Yup.number().required('Brand is required'),
        }),
        productType: Yup.object().shape({
            id: Yup.number().required('Type is required'),
        }),
        productionYear: Yup.number()
            .required('Production year is required')
            .min(1900, 'Year must be after 2015')
            .max(new Date().getFullYear(), `Year must be before ${new Date().getFullYear() + 1}`)
            .typeError('Production year must be a number'),
        image: Yup.mixed().required('Image is required'),
    });

    useEffect(() => {
        fetchBrands();
        fetchTypes();
    }, []);

    const fetchBrands = async () => {
        const response = await BrandService.fetchAllBrands();
        setBrands(response.data);
    };

    const fetchTypes = async () => {
        const response = await ProductTypeService.fetchAllProductTypes();
        setProductTypes(response.data);
    };

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
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const bytes = new Uint8Array(arrayBuffer);
                    setFieldValue('image', bytes);  // Update the Formik state with the byte array
                    console.log(bytes)
                    setPreviewUrl(URL.createObjectURL(file));  // Update the preview URL for display
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className={`${style.product_form_wrapper} animated_content`} data-animation="elementFromRight">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
                <FormikForm className={`${style.product_form} form`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="mb-3">
                        <img
                            className={style.product_image}
                            src={previewUrl || image_placeholder}
                            alt="Product"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                    <div>
                        <BootstrapForm.Group controlId="formFile" className="file_input">
                            <BootstrapForm.Label className="u-pb1" >Select Image</BootstrapForm.Label>
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
                                type="text"
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
                                type="text"
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
                                name="brand.id"
                                onChange={(e) => setFieldValue('brand', brands.find(brand => brand.id === Number(e.target.value)))}
                                value={values.brand.id}
                                isInvalid={touched.brand?.id && !!errors.brand?.id}
                                isValid={touched.brand?.id && !errors.brand?.id}
                            >
                                <option value="" disabled>Select a brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.title}</option>
                                ))}
                            </BootstrapForm.Select>
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.brand?.id && touched.brand?.id ? "visible" : "hidden" }}>
                                {errors.brand?.id}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Type">
                            <BootstrapForm.Select
                                name="productType.id"
                                onChange={(e) => setFieldValue('productType', productTypes.find(type => type.id === Number(e.target.value)))}
                                value={values.productType.id}
                                isInvalid={touched.productType?.id && !!errors.productType?.id}
                                isValid={touched.productType?.id && !errors.productType?.id}
                            >
                                <option value="" disabled>Select a type</option>
                                {productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.title}</option>
                                ))}
                            </BootstrapForm.Select>
                            <BootstrapForm.Control.Feedback type="invalid" style={{ visibility: !!errors.productType?.id && touched.productType?.id ? "visible" : "hidden" }}>
                                {errors.productType?.id}
                            </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel label="Production Year">
                            <BootstrapForm.Control
                                type="text"
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
                    <div className={style.button_container}>
                    <Button type="submit" className={`${style.action_button} button_complementary u-pb1`} disabled={isSubmitting}>
                        {form.id ? 'Save' : 'Add'}
                    </Button>
                    {form.id && (
                        <Button type="button" onClick={() => handleDelete(form.id)}
                            disabled={isSubmitting} className={`${style.action_button} button_complementary u-pb1`}>
                            Delete
                        </Button>
                    )}
                    </div>
            </FormikForm>
        )}
    </Formik>
    </div>
);
};

export default ProductForm;