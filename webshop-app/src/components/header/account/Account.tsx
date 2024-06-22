import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { User } from '../../MainContainerData';
import Admin from '../../admin/Admin';
import Orders from './orders/Orders';
import SidebarMenu from './sidebar_menu/SidebarMenu';
import UserInformation from './user_information/UserInformation';
import style from './Account.module.css'

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = UserService.getUserInfo();
        const userRole = UserService.getUserRole();

        if (userInfo) {
            setUser(userInfo);
            setRole(userRole);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.account_main}>
            <SidebarMenu user={user} />
            <Routes>
                <Route path="/" element={<Navigate to="information" />} />
                <Route path="information" element={<UserInformation />} />
                <Route path="orders" element={<Orders />} />
                {role === 'admin' && <Route path="admin" element={<Admin />} />}
            </Routes>
        </div>
    );
};

export default Account;