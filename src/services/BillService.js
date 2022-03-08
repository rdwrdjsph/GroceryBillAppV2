import axios from 'axios';
import AuthHeader from './AuthHeader';

const API_URL_ADD = 'http://localhost:8083/app/bill/add';
const API_URL_VIEW = 'http://localhost:8083/app/bill/view';


class BillService {
  addBill(clerkOnDuty, regularPrice, discountedPrice, totalPrice) {
    return axios.post(API_URL_ADD, {clerkOnDuty, regularPrice, discountedPrice, totalPrice});
  }

  getBills() {
    return axios.get(API_URL_VIEW, { headers: AuthHeader() });
  }
}

export default new BillService();