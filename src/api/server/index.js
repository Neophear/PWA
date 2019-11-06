//https://webcache.googleusercontent.com/search?q=cache:4YlMbHtQLlwJ:https://tahazsh.com/use-mock-data-in-vue+&cd=1&hl=da&ct=clnk&gl=dk
import axios from "axios";

const fetchData = async url => await axios.get(url);

export default {
  async getUsers() {
    return await fetchData("https://api.myjson.com/bins/106k84");
  },
  async getMachines() {
    return await fetchData("https://api.myjson.com/bins/11ba9w");
  },
  async getModules() {
    return await fetchData("https://api.myjson.com/bins/9bwuc");
  },
  async getSpareParts() {
    return await fetchData("https://api.myjson.com/bins/b47no");
  }
};
