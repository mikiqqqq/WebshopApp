import React, { useEffect, useState } from 'react';
import BrandService from '../../services/BrandService';
import { BrandType } from '../fixed_sidebar/filter/brand/Brand';
import ItemService from '../../services/ItemService';
import ProductTypeService from '../../services/ProductTypeService';
import { Hit } from '../MainContainerData';

interface Product {
    id: number | null;
    title: string;
    description: string;
    price: number;
    quantity: number;
    brand: string;
    type: string;
    productionYear: number;
}

const Admin: React.FC = () => {
    const [products, setProducts] = useState<Array<Hit>>([]);
    const [brands, setBrands] = useState<Array<BrandType>>([]);
    const [productTypes, setProductTypes] = useState<Array<ProductType>>([]);
    const [form, setForm] = useState<Product>({
        id: null,
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        brand: '',
        type: '',
        productionYear: 0
    });

    useEffect(() => {
        fetchProducts();
        fetchBrands();
        fetchTypes();
    }, []);

    const fetchProducts = async () => {
        const response = await ItemService.fetchAllItems();
        setProducts(response.data);
    };

    const fetchBrands = async () => {
        const response = await BrandService.fetchAllBrands();
        setBrands(response.data);
    };

    const fetchTypes = async () => {
        const response = await ProductTypeService.fetchAllProductTypes();
        setProductTypes(response.data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.id) {
            await ProductService.updateProduct(form.id, form);
        } else {
            await ProductService.addProduct(form);
        }
        setForm({
            id: null,
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            brand: '',
            type: '',
            productionYear: 0
        });
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setForm(product);
    };

    const handleDelete = async (productId: number) => {
        await ProductService.deleteProduct(productId);
        fetchProducts();
    };

    const handleAddProduct = () => {
        setForm({
            id: null,
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            brand: '',
            type: '',
            productionYear: 0
        });
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={handleAddProduct}>Add Product</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={form.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={form.quantity} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Brand</label>
                    <select name="brand" value={form.brand} onChange={handleInputChange} required>
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Type</label>
                    <select name="type" value={form.type} onChange={handleInputChange} required>
                        <option value="">Select a type</option>
                        {productTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Production Year</label>
                    <input type="number" name="productionYear" value={form.productionYear} onChange={handleInputChange} required />
                </div>
                <button type="submit">{form.id ? 'Update Product' : 'Add Product'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Brand</th>
                        <th>Type</th>
                        <th>Production Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.brand}</td>
                            <td>{product.type}</td>
                            <td>{product.productionYear}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
