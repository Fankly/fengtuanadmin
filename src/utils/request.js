// 1.导入
import axios from "axios";
import { Loading, Message } from "element-ui";
// 2.创建request实例化
const request = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 6000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

// 3.拦截器 *******
let loadingInstance = null;
request.interceptors.request.use(
  // loading token cancelToken
  (config) => {
    config.headers.token = localStorage.getItem("token");
    loadingInstance = Loading.service({ fullscreen: true });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  // 关闭loading timeout token失效时间 403
  (response) => {
    loadingInstance.close();
    return response.data;
  },
  // 关闭loading  404 邮箱报警
  (error) => {
    loadingInstance.close();
    if (error.message.includes("404")) {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);
// 4.导出
export default request;
