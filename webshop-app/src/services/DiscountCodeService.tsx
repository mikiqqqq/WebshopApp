import axios from 'axios';

const DISCOUNT_CODE_API_BASE_URL = "http://localhost:8080/api/discount-code";

class BrandService {

    fetchActiveDiscountCode(){
        return axios.get(DISCOUNT_CODE_API_BASE_URL + '/get-active');
    }
}

export default new BrandService()