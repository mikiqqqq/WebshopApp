import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';

interface User {
    name: string;
    email: string;
    role: string;
}

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userInfo = UserService.getUserInfo();
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '400px', margin: '20px auto' }}>
            <h2>User Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Link to="/orders" style={{ padding: '10px 20px', display: 'inline-block', background: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                View Orders
            </Link>
            <Link to="/admin" style={{ padding: '10px 20px', display: 'inline-block', background: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                View Admin
            </Link>
        </div>
    );
};

export default Account;
