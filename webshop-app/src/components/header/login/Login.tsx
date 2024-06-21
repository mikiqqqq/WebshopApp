import React, { useState } from 'react';
import UserService from '../../../services/UserService';

const Login: React.FC = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {        
        e.preventDefault();

        try {
            const response = await UserService.login({ email, password });
            console.log(response)
            if (response) {
                window.location.href = '/account';
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div className="main">
            <div>
                <div>Login</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>Email:</div>
                        <input type="text" value={email} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <div>Password:</div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <label>Don't have an account?</label><button>Sign up</button>
            </div>
        </div>
    );
};

export default Login;
