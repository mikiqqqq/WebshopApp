import axios from 'axios';

const BRAND_API_BASE_URL = "https://tech-giant-rest.azurewebsites.net/api/brand";

class BrandService {
    fetchAllBrands(){
        return axios.get(BRAND_API_BASE_URL + '/fetch-all');
    }

    findById(id: number){
        return axios.get(BRAND_API_BASE_URL + '/by-id/' + id);
    }
}

export default new BrandService()