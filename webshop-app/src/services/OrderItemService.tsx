import axios from 'axios';
import { OrderItemType } from '../components/MainContainerData';

const ORDER_ITEM_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/order-item";

class OrderItemService {

    addOrderItem(quantity: number, ordId: number, itemId: number){
        return axios.post(ORDER_ITEM_API_BASE_URL + '/add', {
            quantity: quantity,
            orderId: ordId,
            itemId: itemId
        });
    }

    updateOrderItem(orderItem: OrderItemType){
        return axios.put(ORDER_ITEM_API_BASE_URL + '/update', orderItem);
    }

    fetchAllByOrderId(orderId: number){
        return axios.get(ORDER_ITEM_API_BASE_URL + '/find-all-by-orderId/' + orderId);
    }

    getOrderItemAmount(orderId: number){
        return axios.get(ORDER_ITEM_API_BASE_URL + '/get-orderItemAmount/' + orderId);
    }

    deleteOrderItemAll(itemId: number, orderId: number){
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete-all-by-itemId/itemId=' + itemId + '&orderId=' + orderId);
    }

    deleteOrderItem(id: Number){
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete/' + id);
    }

    deleteAllOrderItemsByOrderId(ordId: number){
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete-all-by-orderId/' + ordId);
    }
}

export default new OrderItemService()