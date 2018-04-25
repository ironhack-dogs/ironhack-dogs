const axios = require("axios");

class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }
  getOneRegister(id) {
    return axios
      .get(`${this.BASE_URL}/image/random`)
      .then(res => 
        res.data)
      .catch(err => console.log(err));
  }
}

module.exports = APIHandler;
