import axios from 'axios';
import { OrderUpdate } from '../components/MainContainerData';

const ORDER_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/order";

class OrderService {

    fetchOrderById(id: number){
        return axios.get(ORDER_API_BASE_URL + '/fetch-order' + id);
    }

    createOrder(){
        return axios.post(ORDER_API_BASE_URL + '/create', {});
    }

    fetchActiveOrders(email: string) {
        return axios.get(ORDER_API_BASE_URL + '/active/' + email);
    }

    fetchCompletedOrders(email: string) {
        return axios.get(ORDER_API_BASE_URL + '/completed/' + email);
    }

    updateOrder(updatedOrder: OrderUpdate){
        return axios.put(ORDER_API_BASE_URL + '/update', {
            id: updatedOrder.id,
            date: updatedOrder.date,
            priceWithNoPdvIncluded: updatedOrder.priceWithNoPdvIncluded,
            total: updatedOrder.total,
            discountCodeId: updatedOrder.discountCodeId,
            paymentMethod: updatedOrder.paymentMethod,
            status: updatedOrder.status,
            creditCardNumber: updatedOrder?.creditCardNumber,
            email: updatedOrder.email,
            phoneNumber: updatedOrder.phoneNumber,
            deliveryAddress: updatedOrder.deliveryAddress,
            note: updatedOrder.note
        });
    }

    deleteOrder(orderId: number){
        return axios.delete(ORDER_API_BASE_URL + '/delete/id=' + orderId);
    }
}

export default new OrderService()