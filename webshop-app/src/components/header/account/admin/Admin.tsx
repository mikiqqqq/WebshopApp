import React, { useState, useEffect, useCallback } from 'react';
import BrandService from '../../../../services/BrandService';
import ProductTypeService from '../../../../services/ProductTypeService';
import { Product, BrandType, ProductType } from '../../../MainContainerData';
import style from './Admin.module.css';
import ProductForm from './product_form/ProductForm';
import ProductTable from './product_table/ProductTable';

const Admin: React.FC = () => {
    const [form, setForm] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        brand: { id: 0, title: '' }, // Updated to include Brand object
        productType: { id: 0, title: '' }, // Updated to include ProductType object
        image: null,
        productionYear: 0,
        imageUrl: undefined
    });
    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [productTypes, setProductTypes] = useState<Array<ProductType>>([]);
    const [reload, setReload] = useState<boolean>(false); // State to trigger re-fetching products

    console.log("Rerendering admin")

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

    const fetchProducts = () => {
        setReload(prevState => !prevState); // Toggle the reload state to trigger fetching products in ProductTable
    };

    const handleEdit = useCallback((product: Product) => {
        setForm(product);
    }, []);

    const handleResetForm = useCallback(() => {
        setForm({
            id: 0,
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            brand: { id: 0, title: '' }, // Reset to default Brand object
            productType: { id: 0, title: '' }, // Reset to default ProductType object
            image: null,
            productionYear: 0,
            imageUrl: undefined
        });
    }, []);

    return (
        <div className={style.admin_panel}>
            <h1>Admin Panel</h1>
            <div className={style.buttons_container}>
                <button onClick={handleResetForm} className={style.admin_button}>Add New</button>
            </div>
            <ProductForm
                form={form}
                brands={brands}
                productTypes={productTypes}
                handleResetForm={handleResetForm}
                fetchProducts={fetchProducts}
            />
            <ProductTable handleEdit={handleEdit} reload={reload} />
        </div>
    );
};

export default Admin;