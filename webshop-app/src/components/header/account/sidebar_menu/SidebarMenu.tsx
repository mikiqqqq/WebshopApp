import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../../MainContainerData';
import UserService from '../../../../services/UserService';
import style from './SidebarMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faReceipt, faRightFromBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import useElementaryAnimation from '../../../../hooks/useElementaryAnimation';

interface SidebarMenuProps {
    user: User;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ user }) => {
    const navigate = useNavigate();
    useElementaryAnimation();
    
    const handleLogout = () => {
        UserService.logout();
        navigate('/');
    };

    return (
        <div className={`${style.sidebar_menu} animated_content`} data-animation="elementFromLeft">
            <NavLink
                to="/account/information"
                className={({ isActive }) => `${style.menu_item} u-pb1 ${isActive ? style.menu_item_selected : ''}`}
            >
                <FontAwesomeIcon icon={faInfo} />
                <p className={style.menu_item_inner}>Information</p>
            </NavLink>
            <NavLink
                to="/account/orders"
                className={({ isActive }) => `${style.menu_item} u-pb1 ${isActive ? style.menu_item_selected : ''}`}
            >
                <FontAwesomeIcon icon={faReceipt} />
                <p className={style.menu_item_inner}>Orders</p>
            </NavLink>
            {user.role === 'ADMIN' && (
                <NavLink
                    to="/admin"
                    className={({ isActive }) => `${style.menu_item} u-pb1 ${isActive ? style.menu_item_selected : ''}`}
                >
                    <FontAwesomeIcon icon={faLock} />
                    <p className={style.menu_item_inner}>Admin</p>
                </NavLink>
            )}
            <button onClick={handleLogout} className={`${style.menu_item} u-pb1`}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p className={style.menu_item_inner}>Log out</p>
            </button>
        </div>
    );
};

export default SidebarMenu;