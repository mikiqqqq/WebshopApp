import axios from 'axios';

const PRODUCT_TYPE_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/productType";

class ProductTypeService {

    fetchAllProductTypes(){
        return axios.get(PRODUCT_TYPE_API_BASE_URL + '/fetch-all');
    }
}

export default new ProductTypeService()