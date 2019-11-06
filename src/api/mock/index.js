//https://tahazsh.com/use-mock-data-in-vue

import users from "./data/users";
import machines from "./data/machines";
import modules from "./data/modules";
import spareparts from "./data/spareparts";

const fetch = (mockData, time = 0) =>
  new Promise(resolve => setTimeout(() => resolve(mockData), time));

export default {
  getUsers() {
    return fetch(users, 1000);
  },
  getMachines() {
    return fetch(machines, 1000);
  },
  getModules() {
    return fetch(modules, 1000);
  },
  getSpareParts() {
    return fetch(spareparts, 1000);
  },
  getSparePart(id) {
    return fetch(spareparts.find(sp => sp.id === id), 1000);
  }
};
