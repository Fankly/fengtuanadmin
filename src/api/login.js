import request from "@/utils/request";
import qs from "qs";

//密保登录接口
export const postLoginApi = (params) => {
  return request({
    url: "/users/login.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//短信登录
export const postMobileApi = (params) => {
  return request({
    url: "/sms/login.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//发送短信
export const postSmsAPi = (params) => {
  return request({
    method: "post",
    url: "/sms/send.jsp",
    data: qs.stringify(params),
  });
};

//令牌登录
export const postTokenAPi = (params) => {
  return request({
    method: "post",
    url: "/token/login.jsp",
    data: qs.stringify(params),
  });
};
