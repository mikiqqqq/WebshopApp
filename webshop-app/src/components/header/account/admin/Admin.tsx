import React, { useState, useCallback } from 'react';
import { Product } from '../../../MainContainerData';
import style from './Admin.module.css';
import ProductForm from './product_form/ProductForm';
import ProductTable from './product_table/ProductTable';
import { Button } from 'react-bootstrap';
import useElementaryAnimation from '../../../../hooks/useElementaryAnimation';

const Admin: React.FC = () => {
    const [form, setForm] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        brand: { id: 0, title: '' },
        productType: { id: 0, title: '' },
        image: '',
        productionYear: 0
    });
    const [reload, setReload] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    useElementaryAnimation();

    const fetchProducts = useCallback(() => {
        setReload((prevState) => !prevState);
    }, []);

    const handleEdit = useCallback((product: Product) => {
        setForm(product);
        setSelectedProduct(product);
    }, []);

    const handleResetForm = useCallback(() => {
        setForm({
            id: 0,
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            brand: { id: 0, title: '' },
            productType: { id: 0, title: '' },
            image: '',
            productionYear: 0
        });
    }, []);

    const handleEditClick = useCallback(() => {
        if (selectedProduct) {
            handleEdit(selectedProduct);
        }
    }, [selectedProduct, handleEdit]);

    return (
        <main className={style.panel}>
            <ProductForm
                form={form}
                handleResetForm={handleResetForm}
                fetchProducts={fetchProducts}
            />
            <div className={`${style.product_table} animated_content`} data-animation="elementScaleIn">
                <div className={`${style.heading} u-l1`}>Admin Panel</div>
                <div className={style.button_container}>
                    <Button onClick={handleResetForm} className={`button_complementary u-pb1`}>
                        Add New
                    </Button>
                    <Button onClick={handleEditClick} className={`button_complementary u-pb1`}>
                        Edit Selected
                    </Button>
                </div>
                <ProductTable handleEdit={handleEdit} reload={reload} />
            </div>
        </main>
    );
};

export default Admin;
