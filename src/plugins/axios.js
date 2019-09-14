import axios from 'axios';

let baseURL = process.env.NODE_ENV === 'production'
  ? 'http://localhost/api'
  // : 'https://citicup.top/api';
  : 'http://47.93.27.41/api';

let baseURL = '/api';

const localConfig = {
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false // 允许跨域请求
};

const localAxios = axios.create(localConfig);

export default localAxios;
