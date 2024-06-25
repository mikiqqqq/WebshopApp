import React, { useEffect, useState, useCallback } from 'react';
import style from './ProductTable.module.css';
import ItemService from '../../../../../services/ItemService';
import { Product } from '../../../../MainContainerData';

interface ProductTableProps {
    handleEdit: (product: Product) => void;
    reload: boolean;
}

const ProductTable: React.FC<ProductTableProps> = React.memo(({ handleEdit, reload }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const fetchProducts = useCallback(async () => {
        const response = await ItemService.fetchAllItems();
        setProducts(response.data);

        if (response.data.length > 0) {
            setSelectedProductId(response.data[0].id);
            handleEdit(response.data[0]);
        }
    }, [handleEdit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, reload]); // Fetch products when reload changes

    const scrollToFileInput = () => {
        if (window.innerWidth < 1025) {
            const fileInput = document.querySelector('.file_input');
            if (fileInput) {
                const fileInputPosition = fileInput.getBoundingClientRect().top + window.scrollY - 16;
                window.scrollTo({ top: fileInputPosition, behavior: 'smooth' });
            }
        }
    };
    const handleRowClick = (product: Product) => {
        setSelectedProductId(product.id);
        handleEdit(product);
        scrollToFileInput();
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLTableRowElement>, product: Product) => {
        if (event.key === 'Enter') {
            setSelectedProductId(product.id);
            handleEdit(product);
            scrollToFileInput();
        }
    };

    return (
        <div className={style.table_container}>
            <table className={style.table}>
                <thead>
                    <tr className='u-pb1'>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Brand</th>
                        <th>Type</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            tabIndex={0}
                            key={product.id}
                            onClick={() => handleRowClick(product)}
                            onKeyDown={(event) => handleKeydown(event, product)}  
                            className={selectedProductId === product.id ? style.selected : ''}
                        >
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.brand.title}</td>
                            <td>{product.productType.title}</td>
                            <td>{product.productionYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default ProductTable;