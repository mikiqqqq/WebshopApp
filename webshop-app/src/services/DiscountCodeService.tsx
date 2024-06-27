import axios from 'axios';

const DISCOUNT_CODE_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/discount-code";

class DiscountCodeService {

    fetchActiveDiscountCode(){
        return axios.get(DISCOUNT_CODE_API_BASE_URL + '/get-active');
    }

    checkDiscountCode(discountCode: string){
        return axios.get(DISCOUNT_CODE_API_BASE_URL + '/find-by-code/' + discountCode);
    }
}

export default new DiscountCodeService()