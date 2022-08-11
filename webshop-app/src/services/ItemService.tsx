import axios from 'axios';
import { FilterOptions } from '../components/fixed_sidebar/filter/brand/Brand';

const ITEMS_API_BASE_URL = "http://localhost:8080/api/items";

class ItemService {

    fetchAllItems(){
        return axios.get(ITEMS_API_BASE_URL + '/fetch-all');
    }

    filterItems(filterOptions: FilterOptions){
        console.log(ITEMS_API_BASE_URL + '/filter-items-by?' 
        + 'brandIds=' + filterOptions.brandIds 
        + '&uprLmt=' + filterOptions.uprLmt
        + '&lwrLmt=' + filterOptions.lwrLmt
        + '&productTypeId=' + filterOptions.productTypeId
        + '&productionYear=' + filterOptions.productionYear
        + '&sortBy=' + filterOptions.sortBy
        + '&sortOrder=' + filterOptions.sortOrder);
        return axios.get(ITEMS_API_BASE_URL + '/filter-items-by?' 
        + 'brandIds=' + filterOptions.brandIds 
        + '&uprLmt=' + filterOptions.uprLmt
        + '&lwrLmt=' + filterOptions.lwrLmt
        + '&productTypeId=' + filterOptions.productTypeId
        + '&productionYear=' + filterOptions.productionYear
        + '&sortBy=' + filterOptions.sortBy
        + '&sortOrder=' + filterOptions.sortOrder);
    }

    findItemByItemId(ids: number[]){
        return axios.get(ITEMS_API_BASE_URL + '/by-itemIds/' + ids);
    }

    findItemByBrandId(brandIds: number[]){
        console.log(ITEMS_API_BASE_URL + '/by-brandIds/' + brandIds);
        return axios.get(ITEMS_API_BASE_URL + '/by-brandIds/' + brandIds);
    }

    findAllInPriceRange(uprLmt: number, lwrLmt: number){
        return axios.get(ITEMS_API_BASE_URL + '/in-price-range/' + uprLmt + '-' + lwrLmt);
    }

    findAllThatContainTarget(target:string){
        console.log(ITEMS_API_BASE_URL + '/contain/' + target);
        return axios.get(ITEMS_API_BASE_URL + '/contain/' + target);
    }
}

export default new ItemService()