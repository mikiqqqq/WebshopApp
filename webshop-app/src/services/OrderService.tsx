// src/services/OrderService.ts

import axios from 'axios';
import { OrderUpdate } from '../components/MainContainerData';
import { Order } from '../components/MainContainerData';

const ORDER_API_BASE_URL = "http://localhost:8080/api/order";

class OrderService {
    async fetchOrderById(id: number): Promise<Order> {
        const response = await axios.get(`${ORDER_API_BASE_URL}/fetch-order/${id}`);
        return response.data;
    }

    async createOrder(): Promise<void> {
        await axios.post(`${ORDER_API_BASE_URL}/create`, {});
    }

    async fetchActiveOrders(): Promise<Order[]> {
        const response = await axios.get(`${ORDER_API_BASE_URL}/active`);
        return response.data;
    }

    async fetchCompletedOrders(): Promise<Order[]> {
        const response = await axios.get(`${ORDER_API_BASE_URL}/completed`);
        return response.data;
    }

    async updateOrder(updatedOrder: OrderUpdate): Promise<void> {
        await axios.put(`${ORDER_API_BASE_URL}/update`, {
            id: updatedOrder.id,
            date: updatedOrder.date,
            priceWithNoPdvIncluded: updatedOrder.priceWithNoPdvIncluded,
            total: updatedOrder.total,
            discountCodeId: updatedOrder.discountCodeId,
            paymentMethod: updatedOrder.paymentMethod,
            creditCardNumber: updatedOrder?.creditCardNumber,
            email: updatedOrder.email,
            phoneNumber: updatedOrder.phoneNumber,
            deliveryAddress: updatedOrder.deliveryAddress,
            note: updatedOrder.note
        });
    }

    async deleteOrder(orderId: number): Promise<void> {
        await axios.delete(`${ORDER_API_BASE_URL}/delete/id=${orderId}`);
    }
}

export default new OrderService();