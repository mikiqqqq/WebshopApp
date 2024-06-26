import React, { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { User, OrderObject, Product } from '../../MainContainerData';
import Orders from './orders/Orders';
import SidebarMenu from './sidebar_menu/SidebarMenu';
import UserInformation from './user_information/UserInformation';
import style from './Account.module.css';
import ItemService from '../../../services/ItemService';
import OrderService from '../../../services/OrderService';

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activeOrders, setActiveOrders] = useState<OrderObject[]>([]);
    const [completedOrders, setCompletedOrders] = useState<OrderObject[]>([]);
    const navigate = useNavigate();
    
    const fetchOrdersAndProducts = useCallback(async () => {
        try {
            const activeResponse = await OrderService.fetchActiveOrders();
            const activeOrdersWithProducts = await Promise.all(
                activeResponse.data.map(async (order: OrderObject) => {
                    const productsResponse = await ItemService.fetchOrderProducts(order.id);
                    const products = productsResponse.data.map((product: Product) => {
                        const imageBlob = product.image ? new Blob([product.image]) : null;
                        const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : 'placeholder-image-url';
                        return { ...product, imageUrl };
                    });
                    return { ...order, products };
                })
            );
            setActiveOrders(activeOrdersWithProducts);

            const completedResponse = await OrderService.fetchCompletedOrders();
            const completedOrdersWithProducts = await Promise.all(
                completedResponse.data.map(async (order: OrderObject) => {
                    const productsResponse = await ItemService.fetchOrderProducts(order.id);
                    const products = productsResponse.data.map((product: Product) => {
                        const imageBlob = product.image ? new Blob([product.image]) : null;
                        const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : 'placeholder-image-url';
                        return { ...product, imageUrl };
                    });
                    return { ...order, products };
                })
            );
            setCompletedOrders(completedOrdersWithProducts);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userInfo = await UserService.getUserInfo();
            if (userInfo) {
                setUser(userInfo);
                await fetchOrdersAndProducts();
            } else {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate, fetchOrdersAndProducts]);

    if (!user) {
        return null;
    }

    return (
        <main className={style.account_main}>
            <SidebarMenu user={user} />
            <Routes>
                <Route path="/" element={<Navigate to="information" replace/>} />
                <Route path="information" element={<UserInformation />} />
                <Route path="orders" element={<Orders activeOrders={activeOrders} completedOrders={completedOrders} />} />
            </Routes>
        </main>
    );
};

export default Account;