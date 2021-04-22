import axios from 'axios'

import {config as appConfig} from '../config/constants'

const httpsProxyAgent = require('https-proxy-agent');

const axiosInstance = axios.create({
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (appConfig.proxy) {
      const proxyAgent = new httpsProxyAgent(appConfig.proxy)
      config.httpsAgent = proxyAgent,
      config.proxy = false
    }
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
    return config;
  }
  );
  
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const axiosService = axiosInstance