import React, { useEffect, useState, useCallback } from 'react';
import style from './ProductTable.module.css';
import ItemService from '../../../../../services/ItemService';
import { Product } from '../../../../MainContainerData';

interface ProductTableProps {
    handleEdit: (product: Product) => void;
    reload: boolean; // Trigger to reload the table
}

const ProductTable: React.FC<ProductTableProps> = React.memo(({ handleEdit, reload }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    console.log("Rerendering table!");

    const fetchProducts = useCallback(async () => {
        const response = await ItemService.fetchAllItems();
        setProducts(response.data);
        console.log("fetching products!");

        if (response.data.length > 0) {
            setSelectedProductId(response.data[0].id);
            handleEdit(response.data[0]);
        }
    }, [handleEdit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, reload]); // Fetch products when reload changes

    const handleRowClick = (product: Product) => {
        setSelectedProductId(product.id);
        handleEdit(product);
    };

    return (
        <div>
            <table className={style.product_table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Brand</th>
                        <th>Type</th>
                        <th>Production Year</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            onClick={() => handleRowClick(product)}
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