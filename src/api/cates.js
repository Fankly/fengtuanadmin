import request from "@/utils/request";
import qs from "my_qs";

//分类列表
export const getCatesApi = (params) => {
  return request({
    url: "/cate/index.jsp",
    method: "get",
    params,
  });
};

//分类创建
export const postCatesApi = (params) => {
  return request({
    url: "/cate/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//分类编辑
export const putCatesApi = (params) => {
  return request({
    url: "/cate/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//分类删除
export const deleteCatesApi = (params) => {
  return request({
    url: "/cate/delete.jsp",
    method: "delete",
    params,
  });
};
