import request from "@/utils/request";
import qs from "qs";

//门店列表
export const getStoresApi = (params) => {
  return request({
    url: "/stores/index.jsp",
    method: "get",
    params,
  });
};

//删除门店
export const deleteStoresApi = (params) => {
  return request({
    url: "/stores/delete.jsp",
    method: "delete",
    params,
  });
};

//查询地区
export const getAreasApi = (params) => {
  return request({
    url: "/areas/index.jsp",
    method: "get",
    params,
  });
};

//门店创建
export const postStoresApi = (params) => {
  return request({
    url: "/stores/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};
