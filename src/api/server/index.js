//https://webcache.googleusercontent.com/search?q=cache:4YlMbHtQLlwJ:https://tahazsh.com/use-mock-data-in-vue+&cd=1&hl=da&ct=clnk&gl=dk
import axios from "axios";
import router from "../../router";
import store from "../../store";

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

      if (!error.response) returnError.message = "Serveren svarede ikke.";
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
    return await axios.get("https://localhost:44357/api/machine");
  },
  async getMachine(id) {
    return await axios.get("https://localhost:44357/api/machine/" + id);
  },
  async getMachineModules(machineId) {
    return await axios.get(
      "https://localhost:44357/api/machine/" + machineId + "/modules"
    );
  },
  async getModules() {
    return await axios.get("https://localhost:44357/api/module");
  },
  async getModule(id) {
    return await axios.get("https://localhost:44357/api/module/" + id);
  },
  async getSpareParts() {
    return await axios.get("https://localhost:44357/api/sparepart");
  },
  async getSparePart(id) {
    return await axios.get("https://localhost:44357/api/sparepart/" + id);
  },
  async getModuleSpareParts(moduleId) {
    return await axios.get(
      "https://localhost:44357/api/module/" + moduleId + "/spareparts"
    );
  },
  async authenticate(user) {
    return await axios.post(
      "https://localhost:44357/api/authenticate/login",
      user
    );
  },
  async getQR(code){
    return await axios.get("https://localhost:44357/api/search/" + code)
  }
};
