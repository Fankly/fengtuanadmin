<template>
  <qf-card
    class-name="users"
    title="用户列表"
    btn-url="/users/create"
    btn-title="创建用户"
  >
    <!--筛选-->
    <template #filter>
      <el-input v-model="params.uname">
        <el-button
          @click="handlerSearchName"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>

      <el-date-picker
        v-model="params.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </template>

    <!--表格-->
    <qf-table :tableData="tableData" :columns="columns"></qf-table>
    <!--    分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    ></el-pagination>
    <UserEdit :state.sync="userEditState" :row="userRow"></UserEdit>
    <UserAssignRole
      :row="userRow"
      :state="UserAssignRoleState"
      @close="UserAssignRoleState = false"
    ></UserAssignRole>
  </qf-card>
</template>

<script>
import { getUsersApi, deleteUsersApi, putUsersStateApi } from "@/api/users";

export default {
  watch: {
    "params.date"(newData) {
      this.params.start_time = newData ? newData[0] : "";
      this.params.end_time = newData ? newData[1] : "";
      this.handlerInitData();
    },
  },
  components: {
    UserEdit: () => import("./components/UserEdit"),
    UserAssignRole: () => import("./components/UserAssignRole"),
  },
  created() {
    this.handlerInitData();
  },
  methods: {
    handlerSearchName() {
      this.handlerInitData();
    },
    handleSizeChange(val) {
      this.params.pagenum = 1;
      this.params.pagesize = val;
      this.handlerInitData();
    },
    handleCurrentChange(val) {
      this.params.pagenum = val;
      this.handlerInitData();
    },
    async handlerInitData() {
      let res = await getUsersApi(this.params);
      this.tableData = res.data.list;
      this.totalPage = parseInt(res.data.total);
    },
  },
  data() {
    return {
      userRow: {},
      totalPage: 0,
      userEditState: false,
      UserAssignRoleState: false,
      tableData: [],
      params: {
        pagenum: 1,
        pagesize: 10,
        uname: "",
        start_time: "",
        end_time: "",
        date: [],
      },
      columns: [
        { title: "编号", field: "user_id" },
        { title: "所属角色", field: "role_name" },
        { title: "用户名", field: "username" },
        { title: "创建于", field: "create_time" },
        {
          title: "冻结",
          field: "state",
          type: "switch",
          payload: {
            open: "1",
            close: "0",
            change: async (row) => {
              let res = await putUsersStateApi(row);
              if (res.meta.state === 200) {
                this.$notify({
                  title: res.meta.msg,
                  type: "success",
                });
              } else {
                this.$notify({
                  title: res.meta.msg,
                  type: "error",
                });
              }
            },
          },
        },
        {
          title: "操作",
          width: 300,
          fixed: "right",
          type: "btn",
          payload: [
            {
              name: "修改用户",
              type: "primary",
              click: async (row) => {
                this.userEditState = true;
                row.question = row.passwd_question;
                row.answer = row.passwd_answer;
                this.userRow = { ...row };
              },
            },
            {
              name: "分配角色",
              type: "success",
              click: (row) => {
                this.UserAssignRoleState = true;
                this.userRow = row;
              },
            },
            {
              name: "删除",
              type: "danger",
              click: (row) => {
                this.confirmFn(async () => {
                  let res = await deleteUsersApi(row);
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
  .filter {
    display: flex;
    justify-content: space-between;

    .el-input {
      width: 300px;
    }
  }

  .el-table {
    margin: 10px 0;
  }

  .el-pagination {
    text-align: right;
    padding: 10px 10px 10px 0;
  }
}
</style>
