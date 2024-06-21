import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ErrorResponse, JwtPayload, User, UserForm } from '../components/MainContainerData';

const USERS_API_BASE_URL = "http://localhost:8080/api/user";

class UserService {
    async login(userForm: UserForm) {
        try {
            const response = await axios.post(`${USERS_API_BASE_URL}/login`, userForm);
            const token = response.data; // Directly use response.data as the token
            
            if (response.status === 200 && token) {
                localStorage.setItem('token', token);
            }

            return { token };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Error is an AxiosError
                if (error.response) {
                    const errorData = error.response.data as ErrorResponse;
                    // Request made and server responded with a status code outside of the range of 2xx
                    throw new Error(errorData.message || 'Login failed');
                } else if (error.request) {
                    // Request was made but no response was received
                    throw new Error('No response received from server');
                } else {
                    // Something happened in setting up the request
                    throw new Error('Error setting up login request');
                }
            } else {
                // Error is not an AxiosError
                throw new Error('An unknown error occurred');
            }
        }
    }

    async register(user: User) {
        try {
            const response = await axios.post(`${USERS_API_BASE_URL}/register`, user);

            const data = response.data;

            if (response.status === 200) {
                return data;
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Error is an AxiosError
                if (error.response) {
                    const errorData = error.response.data as ErrorResponse;
                    // Request made and server responded with a status code outside of the range of 2xx
                    throw new Error(errorData.message || 'Registration failed');
                } else if (error.request) {
                    // Request was made but no response was received
                    throw new Error('No response received from server');
                } else {
                    // Something happened in setting up the request
                    throw new Error('Error setting up registration request');
                }
            } else {
                // Error is not an AxiosError
                throw new Error('An unknown error occurred');
            }
        }
    }
    
    logout() {
        localStorage.removeItem('token');
    }
    
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
    
    getUserRole() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            return decodedToken.role;
        } catch (e) {
            console.error('Invalid token', e);
            return null;
        }
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            return {
                name: decodedToken.name,
                email: decodedToken.email,
                role: decodedToken.role
            };
        } catch (e) {
            console.error('Invalid token', e);
            return null;
        }
    }
}

export default new UserService();