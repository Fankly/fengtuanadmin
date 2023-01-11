import request from "@/utils/request";
import qs from "my_qs";

//获取角色列表
export const getRolesApi = () => {
  return request({
    url: "/roles/index.jsp",
    method: "get",
  });
};
//角色创建
export const postRolesApi = (params) => {
  return request({
    url: "/roles/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};

//角色删除
export const deleteRolesApi = (params) => {
  return request({
    url: "roles/delete.jsp",
    method: "delete",
    params,
  });
};

//角色编辑
export const putRolesApi = (params) => {
  return request({
    url: "/roles/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

//分配权限
export const putAssignAuthsApi = (params) => {
  return request({
    url: "/roles/assign.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};
