//https://webcache.googleusercontent.com/search?q=cache:4YlMbHtQLlwJ:https://tahazsh.com/use-mock-data-in-vue+&cd=1&hl=da&ct=clnk&gl=dk
import axios from "axios";
import router from "../../router";
import store from "../../store";

const address = "https://sem4project.azurewebsites.net";

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
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.endsWith("/login")
    )
      router.push({ name: "login" });
    else {
      var returnError = {};
      returnError.status = error.response ? error.response.status : 408;

      if (!error.response)
        returnError.message = "Serveren svarede ikke." + address;
      else if (error.response.status.toString()[0] === "5")
        returnError.message = "Fejl på serveren.";
      else if (error.response.status === 404)
        returnError.message = "Findes ikke.";

      return Promise.reject(returnError);
    }
  }
);

export default {
  async getMachines() {
    return await axios.get(address + "/api/machine");
  },
  async getModules() {
    return await axios.get(address + "/api/module");
  },
  async getSpareParts() {
    return await axios.get(address + "/api/sparepart");
  },
  async authenticate(user) {
    return await axios.post(address + "/api/authenticate/login", user);
  }
};
