//https://webcache.googleusercontent.com/search?q=cache:4YlMbHtQLlwJ:https://tahazsh.com/use-mock-data-in-vue+&cd=1&hl=da&ct=clnk&gl=dk
import axios from "axios";

const fetchData = async url => await axios.get(url);

export default {
  async getMachines() {
    return await fetchData("https://api.myjson.com/bins/11ba9w");
  },
  async getModules() {
    return await fetchData("https://api.myjson.com/bins/9bwuc");
  },
  async getSpareParts() {
    return await fetchData("https://api.myjson.com/bins/b47no");
  },
  async authenticate(user) {
    return await axios.post(
      "https://localhost:44357/api/account/authenticate",
      user,
      {
        withCredentials: true
      }
    );
  },
  async logOut() {
    return await axios.post("https://localhost:44357/api/account/signout", {
      withCredentials: true
    });
  },
  async getUsers() {
    return await axios.get("https://localhost:44357/api/account", {
      withCredentials: true
    });
  }
};
