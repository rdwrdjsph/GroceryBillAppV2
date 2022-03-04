import axios from "axios";

const API_URL = "http://localhost:8081/app/api/auth/";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password
      });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();