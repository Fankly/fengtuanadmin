import request from "@/utils/request";
import qs from "my_qs";
//权限列表
export const getAuthsApi = (params) => {
  return request({
    url: "/auth/index.jsp",
    method: "get",
    params,
  });
};

//权限创建
export const postAuthsApi = (params) => {
  return request({
    url: "auth/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//权限删除
export const deleteAuthsApi = (params) => {
  return request({
    url: "auth/delete.jsp",
    method: "delete",
    params,
  });
};

//权限编辑
export const putAuthsApi = (params) => {
  return request({
    url: "auth/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//不同权限展示不同角色
export const getMenuApi = (params) => {
  return request({
    url: "auth/menu.jsp",
    method: "get",
    params,
  });
};
