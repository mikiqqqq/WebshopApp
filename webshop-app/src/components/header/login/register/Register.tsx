import React, { useState } from 'react';
import UserService, { User } from '../../../../services/UserService';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user: User = { name, email, password };
            const response = await UserService.register(user);
            if (response) {
                alert('Registration successful');
                window.location.href = '/login';
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Registration error', error);
            alert((error as Error).message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
