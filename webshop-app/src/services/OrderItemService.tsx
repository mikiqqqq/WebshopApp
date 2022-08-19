import axios from 'axios';

const ORDER_ITEM_API_BASE_URL = "http://localhost:8080/api/order-item";

class OrderItemService {

    createOrderItem(ordId: number, itId: number){
        return axios.post(ORDER_ITEM_API_BASE_URL + '/add', {
            orderId: ordId,
            itemId: itId
        });
    }

    createMultipleOrderItems(ordId: number, itId: number, quantity: number){
        return axios.post(ORDER_ITEM_API_BASE_URL + '/add-multiple/' + quantity, {
            orderId: ordId,
            itemId: itId
        });
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

    deleteOrderItem(ordId: number, itId: number){
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete/orderId=' + ordId + '&itemId=' + itId);
    }

    deleteAllOrderItemsByOrderId(ordId: number){
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete-all-by-orderId/' + ordId);
    }
}

export default new OrderItemService()