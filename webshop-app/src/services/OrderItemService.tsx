import axios from 'axios';

const ORDER_ITEM_API_BASE_URL = "http://localhost:8080/api/order-item";

class OrderItemService {

    createOrderItem(ordId: number, itId: number){
        console.log(ORDER_ITEM_API_BASE_URL + '/add', {
            orderId: ordId,
            itemId: itId
        });
        return axios.post(ORDER_ITEM_API_BASE_URL + '/add', {
            orderId: ordId,
            itemId: itId
        });
    }

    fetchAllByOrderId(orderId: number){
        return axios.get(ORDER_ITEM_API_BASE_URL + '/find-all-by-orderId/' + orderId);
    }

    getOrderItemAmount(orderId: number){
        console.log(ORDER_ITEM_API_BASE_URL + '/get-orderItemAmount/' + orderId);
        return axios.get(ORDER_ITEM_API_BASE_URL + '/get-orderItemAmount/' + orderId);
    }

    deleteOrderItemsAll(itemId: number, orderId: number){
        console.log(ORDER_ITEM_API_BASE_URL + '/delete-all-by-itemId/itemId=' + itemId + '&orderId=' + orderId);
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete-all-by-itemId/itemId=' + itemId + '&orderId=' + orderId);
    }

    deleteOrderItemByItemId(itemId: number, orderId: number){
        console.log(ORDER_ITEM_API_BASE_URL + '/delete-by-itemId/itemId=' + itemId + '&orderId=' + orderId);
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete-by-itemId/itemId=' + itemId + '&orderId=' + orderId);
    }

    deleteOrderItem(ordId: number, itId: number){
        console.log(ORDER_ITEM_API_BASE_URL + '/delete/orderId=' + ordId + '&itemId=' + itId);
        return axios.delete(ORDER_ITEM_API_BASE_URL + '/delete/orderId=' + ordId + '&itemId=' + itId);
    }
}

export default new OrderItemService()