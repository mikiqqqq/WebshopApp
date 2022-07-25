import axios from 'axios';

const BRAND_API_BASE_URL = "http://localhost:8080/api/brand";

class BrandService {

    fetchAllBrands(){
        return axios.get(BRAND_API_BASE_URL + '/fetch-all');
    }
}

export default new BrandService()