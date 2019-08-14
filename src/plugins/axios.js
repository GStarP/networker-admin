import axios from 'axios';

let baseURL = process.env.NODE_ENV === 'production'
  ? 'http://101.132.35.81:6324'
  : 'http://localhost:3000';

const localConfig = {
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false // 允许跨域请求
};

const localAxios = axios.create(localConfig);

export default localAxios;
