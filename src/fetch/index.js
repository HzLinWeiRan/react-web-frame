import axios from 'axios';
import api from './api';

// 公共参数配置
const instance = axios.create({
    baseURL: window.baseURL,
    timeout: 10000,
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    transformRequest: [(data) => {
        // Do whatever you want to transform the data
        if (data) {
            let datas = '';
            Object.entries(data).forEach((item) => {
                if (datas !== '') datas += '&';
                datas += `${item[0]}=${item[1]}`;
            });
            return datas;
        }
        return '';
    }]
});
// 返回结果公共处理
instance.interceptors.response.use((res) => {
    if (!res) {
        return Promise.reject(res);
    }
    return res.data;
}, error => Promise.reject(error));

// 创建单个请求
function createApi(config) {
    return (data) => {
        if (config.method === 'get') {
            return instance({
                ...config,
                params: {
                    ...data,
                    lang: localStorage.lang
                }
            });
        }
        return instance({
            ...config,
            data: {
                ...data,
                lang: localStorage.lang
            }
        });
    };
}
const apis = {};

Object.entries(api).forEach((item) => {
    apis[item[0]] = createApi(item[1]);
});

export default apis;
