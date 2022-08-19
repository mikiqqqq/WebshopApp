import axios from 'axios';

const PRODUCT_TYPE_API_BASE_URL = "http://localhost:8080/api/productType";

class ProductTypeService {

    fetchAllProductTypes(){
        return axios.get(PRODUCT_TYPE_API_BASE_URL + '/fetch-all');
    }
}

export default new ProductTypeService()