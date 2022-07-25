import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:8080/api/order";

class OrderService {

    fetchOrderById(id: number){
        return axios.get(ORDER_API_BASE_URL + '/fetch-order' + id);
    }

    createOrder(dateOfCreation: string){
        return axios.post(ORDER_API_BASE_URL + '/create', {
            date: dateOfCreation
        });
    }
    updateOrder(){
        return axios.get(ORDER_API_BASE_URL + '/update');
    }
    deleteOrder(orderId: number){
        return axios.post(ORDER_API_BASE_URL + '/delete/id=' + orderId);
    }
}

export default new OrderService()