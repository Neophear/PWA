//https://webcache.googleusercontent.com/search?q=cache:4YlMbHtQLlwJ:https://tahazsh.com/use-mock-data-in-vue+&cd=1&hl=da&ct=clnk&gl=dk
import axios from "axios";
import router from "../../router";
import store from "../../store";

const fetchData = async url => await axios.get(url);

axios.interceptors.request.use(
  config => {
    const token = store.state.AuthStore.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && !error.config.url.endsWith("/login"))
      router.push({ name: "login" });
    else return Promise.reject(error);
  }
);

export default {
  async getMachines() {
    return await fetchData("https://api.myjson.com/bins/11ba9w");
  },
  async getModules() {
    return await fetchData("https://api.myjson.com/bins/9bwuc");
  },
  async getSpareParts() {
    return await axios.get("https://localhost:44357/api/sparepart");
  },
  async authenticate(user) {
    return await axios.post(
      "https://localhost:44357/api/authenticate/login",
      user
    );
  },
  async getUsers() {
    return await axios.get("https://localhost:44357/api/account");
  }
};
