import axios from 'axios';

const BRAND_API_BASE_URL = "http://localhost:8080/api/brand";

class BrandService {

    fetchAllItems(){
        return axios.get(BRAND_API_BASE_URL + '/fetch-all');
    }

    findItemByName(brandName:string){
        return axios.get(BRAND_API_BASE_URL + '/by-name/' + brandName)
    }
}

export default new BrandService()