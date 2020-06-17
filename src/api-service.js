import config from "./config";

const ApiService = {
  getAll() {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${config.API_KEY}/latest/EUR`,
      {
        method: "GET",
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getByCode(code) {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${config.API_KEY}/latest/${code}`,
      {
        method: "GET",
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ApiService;
