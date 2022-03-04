import axios from 'axios';
import AuthHeader from './AuthHeader';

const API_URL = 'http://localhost:8081/app/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: AuthHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: AuthHeader() });
  }

  getSuperAdminBoard() {
    return axios.get(API_URL + 'sadmin', { headers: AuthHeader() });
  }
}

export default new UserService();