import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ErrorResponse, ErrorResponse400, JwtPayload, UserRegisterForm, UserLoginForm } from '../components/MainContainerData';

const USERS_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/user";

class UserService {
    async login(userForm: UserLoginForm) {
        try {
            const response = await axios.post(`${USERS_API_BASE_URL}/login`, userForm);
            const token = response.data; // Directly use response.data as the token

            if (response.status === 200 && token) {
                localStorage.setItem('token', token);
            }

            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    const errorData = error.response.data as ErrorResponse400;
                    throw { status: error.response.status, errors: errorData }; // Adjusting to match the error structure
                } else if (error.response.status === 404) {
                    const errorData = error.response.data as ErrorResponse;
                    throw { status: error.response.status, message: errorData.error };
                }
            } else if (axios.isAxiosError(error)) {
                throw new Error('Network or server error');
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async register(user: UserRegisterForm) {
        try {
            const response = await axios.post(`${USERS_API_BASE_URL}/register`, user);

            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    const errorData = error.response.data as ErrorResponse400;
                    throw { status: error.response.status, errors: errorData }; // Adjusting to match the error structure
                } else if (error.response.status === 409) {
                    const errorData = error.response.data as ErrorResponse;
                    throw { status: error.response.status, message: errorData.error };
                }
            } else if (axios.isAxiosError(error)) {
                throw new Error('Network or server error');
            } else {
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