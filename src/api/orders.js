import request from "@/utils/request";
import qs from "my_qs";

//订单列表
export const getOrdersApi = (params) => {
  return request({
    url: "/orders/index.jsp",
    method: "get",
    params,
  });
};

//订单统计
export const getOrdersTotalApi = (params) => {
  return request({
    url: "/orders/total.jsp",
    method: "get",
    params,
  });
};

//订单修改
export const putOrdersApi = (params) => {
  return request({
    url: "/orders/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//订单删除
export const deleteOrdersApi = (params) => {
  return request({
    url: "/orders/delete.jsp",
    method: "delete",
    params,
  });
};

//订单统计
export const totalOrdersApi = (params) => {
  return request({
    url: "/orders/total.jsp",
    method: "get",
    params,
  });
};
