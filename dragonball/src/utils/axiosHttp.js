import axios from 'axios';

const http = axios.create({
  baseURL: "https://dragonball-api.com/api",
});

export default http;