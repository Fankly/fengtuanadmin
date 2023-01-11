import request from "@/utils/request";
import qs from "my_qs";

//获取访客记录
export const getHistoryApi = (params) => {
  return request({
    url: "/users/history.jsp",
    method: "get",
    params,
  });
};

//获取用户列表
export const getUsersApi = (params) => {
  return request({
    url: "/users/index.jsp",
    method: "get",
    params,
  });
};

//创建用户
export const postUsersApi = (params) => {
  return request({
    url: "/users/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//删除用户
export const deleteUsersApi = (params) => {
  return request({
    url: "/users/delete.jsp",
    method: "delete",
    params,
  });
};

//编辑用户
export const putUsersApi = (params) => {
  return request({
    url: "/users/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//分配角色
export const putUsersAssignApi = (params) => {
  return request({
    url: "/users/assign.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//用户状态切换
export const putUsersStateApi = (params) => {
  return request({
    url: "/users/state.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};
