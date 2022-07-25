import axios from 'axios';

const ORDER_ITEM_API_BASE_URL = "http://localhost:8080/api/order-item";

class OrderItemService {

    createOrderItem(ordId: number, itId: number){
        return axios.post(ORDER_ITEM_API_BASE_URL + '/add', {
            orderId: ordId,
            itemId: itId
        });
    }

    deleteOrderItem(orderItemId: number){
        return axios.post(ORDER_ITEM_API_BASE_URL + '/delete/id=' + orderItemId);
    }
}

export default new OrderItemService()