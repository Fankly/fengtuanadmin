import request from "@/utils/request";
import qs from "my_qs";

//商品列表
export const getGoodsApi = (params) => {
  return request({
    url: "/goods/index.jsp",
    method: "get",
    params,
  });
};

//商品创建
export const postGoodsApi = (params) => {
  return request({
    url: "/goods/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//商品删除
export const deleteGoodsApi = (params) => {
  return request({
    url: "/goods/delete.jsp",
    method: "delete",
    params,
  });
};
