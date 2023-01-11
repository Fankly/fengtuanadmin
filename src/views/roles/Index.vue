<template>
  <qf-card
    class-name="users"
    title="角色列表"
    btn-title="角色创建"
    btn-url="/roles/create"
  >
    <!--表格-->
    <qf-table :tableData="tableData" :columns="columns"></qf-table>
    <RolesEdit :state.sync="rolesEditState" :row="rolesRow"></RolesEdit>
    <RolesAssignRole
      :handlerInitData="handlerInitData"
      :row="rolesRow"
      :state="rolesAssignRoleState"
      @close="rolesAssignRoleState = false"
    ></RolesAssignRole>
  </qf-card>
</template>

<script>
import { getRolesApi, deleteRolesApi } from "@/api/roles";

export default {
  components: {
    RolesEdit: () => import("./components/RolesEdit"),
    RolesAssignRole: () => import("./components/RolesAssignRole"),
  },
  created() {
    this.handlerInitData();
  },
  methods: {
    async handlerInitData() {
      let res = await getRolesApi();
      this.tableData = res.data;
    },
  },
  data() {
    return {
      rolesRow: {},
      rolesEditState: false,
      rolesAssignRoleState: false,
      tableData: [],
      columns: [
        { title: "编号", field: "role_id" },
        { title: "角色名称", field: "role_name" },
        { title: "角色描述", field: "role_describe" },
        {
          title: "操作",
          width: 300,
          fixed: "right",
          type: "btn",
          payload: [
            {
              name: "分配权限",
              type: "primary",
              click: (row) => {
                this.rolesRow = row;
                this.rolesAssignRoleState = true;
              },
            },
            {
              icon: "el-icon-edit",
              type: "success",
              click: async (row) => {
                this.rolesEditState = true;
                //解决bug:用户编辑时,同步界面修改,解决此问题
                this.rolesRow = { ...row };
              },
            },
            {
              icon: "el-icon-delete",
              type: "danger",
              click: (row) => {
                this.confirmFn(async () => {
                  let res = await deleteRolesApi(row);
                  console.log(res);
                  if (res.meta.state === 200) {
                    this.$message.success(res.meta.msg);
                    this.handlerInitData();
                  } else {
                    this.$message.error(res.meta.msg);
                  }
                });
              },
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.users {
  .el-table {
    margin: 10px 0;
  }
}
</style>
