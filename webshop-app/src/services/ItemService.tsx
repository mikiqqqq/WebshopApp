import axios from 'axios';

const ITEMS_API_BASE_URL = "http://localhost:8080/api/items";

class ItemService {

    fetchAllItems(){
        return axios.get(ITEMS_API_BASE_URL + '/fetch-all');
    }

    findItemByName(itemName:string){
        return axios.get(ITEMS_API_BASE_URL + '/find-by/' + itemName)
    }

    findAllThatContainTarget(target:string){
        return axios.get(ITEMS_API_BASE_URL + '/contain/' + target)
    }
}

export default new ItemService()