import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lws-json-server-expense-tracke.herokuapp.com/",
});

export default axiosInstance;
//https://own-data-server.herokuapp.com
