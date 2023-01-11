<template>
  <qf-card class-name="usersHistory" title="访客记录">
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
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-model="params.date"
      ></el-date-picker>
    </template>

    <!--表格-->
    <qf-table :tableData="tableData" :columns="columns"></qf-table>
    <!--    分页-->
    <el-pagination
      style="text-align: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    ></el-pagination>
  </qf-card>
</template>

<script>
// import res from "~mock/users/history";
import { getHistoryApi } from "@/api/users";

export default {
  created() {
    this.handlerInitData();
  },
  watch: {
    "params.date"(newData) {
      this.params.start_time = newData ? newData[0] : "";
      this.params.end_time = newData ? newData[1] : "";
      this.handlerInitData();
    },
  },
  methods: {
    handlerSearchName() {
      this.handlerInitData();
    },
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.params.pagenum = 1;
      this.handlerInitData();
    },
    handleCurrentChange(val) {
      this.params.pagenum = val;
      this.handlerInitData();
    },
    async handlerInitData() {
      let res = await getHistoryApi(this.params);
      this.tableData = res.data.list;
      this.totalPage = parseInt(res.data.total);
    },
  },
  data() {
    return {
      totalPage: 0,
      tableData: [],
      params: {
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
        uname: "",
        date: [],
      },
      columns: [
        { title: "编号", field: "id" },
        { title: "用户", field: "username" },
        { title: "登录方式", field: "type" },
        { title: "登录城市", field: "city" },
        { title: "登录时间", field: "login_time" },
        { title: "上一次登录时间", field: "prev_login_time" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.usersHistory {
  // filter
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
    padding: 10px 0;
    padding-right: 10px;
  }
}
</style>
