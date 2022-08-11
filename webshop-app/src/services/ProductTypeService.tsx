import axios from 'axios';

const PRODUCT_TYPE_API_BASE_URL = "http://localhost:8080/api/productType";

class BrandService {

    fetchAllProductTypes(){
        return axios.get(PRODUCT_TYPE_API_BASE_URL + '/fetch-all');
    }
}

export default new BrandService()