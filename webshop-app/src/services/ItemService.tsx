import axios from 'axios';
import { FilterOptions, Product } from "../components/MainContainerData";

const ITEMS_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/items";

class ItemService {
    addItem(product: Product) {
        const token = localStorage.getItem('token');
        return axios.post(ITEMS_API_BASE_URL + '/admin/add', product, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    removeItem(id: number) {
        const token = localStorage.getItem('token');
        return axios.delete(ITEMS_API_BASE_URL + '/admin/remove/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    fetchAllItems(){
        return axios.get(ITEMS_API_BASE_URL + '/all');
    }

    fetchRandomProducts(limit: number){
        return axios.get(ITEMS_API_BASE_URL + '/random-items/' + limit);
    }
    
    filterItems(filterOptions: FilterOptions){
        return axios.get(ITEMS_API_BASE_URL + '/filter-items-by?' 
        + 'brandIds=' + filterOptions.brandIds 
        + '&uprLmt=' + filterOptions.uprLmt
        + '&lwrLmt=' + filterOptions.lwrLmt
        + '&productTypeId=' + filterOptions.productTypeId
        + '&productionYear=' + filterOptions.productionYear
        + '&sortBy=' + filterOptions.sortBy
        + '&sortOrder=' + filterOptions.sortOrder);
    }

    fetchOrderProducts(id: number){
        return axios.get(ITEMS_API_BASE_URL + '/by-orderId/' + id);
    }

    fetchById(id: number){
        return axios.get(ITEMS_API_BASE_URL + '/by-id/' + id);
    }

    findItemByItemId(ids: number[]){
        return axios.get(ITEMS_API_BASE_URL + '/by-itemIds/' + ids);
    }

    findItemByBrandId(brandIds: number[]){
        return axios.get(ITEMS_API_BASE_URL + '/by-brandIds/' + brandIds);
    }

    findAllInPriceRange(uprLmt: number, lwrLmt: number){
        return axios.get(ITEMS_API_BASE_URL + '/in-price-range/' + uprLmt + '-' + lwrLmt);
    }

    findAllThatContainTarget(target:string){
        return axios.get(ITEMS_API_BASE_URL + '/contain/' + target);
    }
}

export default new ItemService()