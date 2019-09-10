import axios from 'axios';

let baseURL = process.env.NODE_ENV === 'production'
  ? 'https://citicup.top/api'
  : 'https://citicup.top/api';

const localConfig = {
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false // 允许跨域请求
};

const localAxios = axios.create(localConfig);

export default localAxios;
