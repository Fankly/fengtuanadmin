<template>
  <qf-card
    btn-title="创建"
    btn-url="/cates/create"
    title="分类列表"
    class-name="cates"
  >
    <qf-table
      :columns="columns"
      :table-data="tableData"
      row-key="cat_id"
    ></qf-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    ></el-pagination>
    <CatesEdit :row="catesRow" :state.sync="catesEditState"></CatesEdit>
  </qf-card>
</template>

<script>
import { getCatesApi, deleteCatesApi } from "@/api/cates";

export default {
  components: {
    CatesEdit: () => import("./components/CatesEdit"),
  },
  created() {
    this.handlerInitData();
  },
  methods: {
    async handlerInitData() {
      let res = await getCatesApi(this.params);
      this.totalPage = parseInt(res.data.total);
      this.tableData = res.data.list;
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
  },
  data() {
    return {
      catesEditState: false,
      catesRow: {},
      tableData: [],
      totalPage: 0,
      params: {
        pagenum: 1,
        pagesize: 5,
      },
      columns: [
        {
          title: "分类编号",
          field: "cat_id",
        },
        {
          title: "分类名称",
          field: "cat_name",
        },
        {
          title: "分类层次",
          type: "tag",
          payload: {
            type: "elTagTypeFilter",
            filterName: "cateFilter",
            field: "level",
          },
        },
        {
          title: "操作",
          fixed: "right",
          type: "btn",
          width: 300,
          payload: [
            {
              type: "primary",
              name: "修改分类",
              click: (row) => {
                this.catesEditState = true;
                this.catesRow = row;
              },
            },
            {
              type: "danger",
              name: "删除",
              click: (row) => {
                this.confirmFn(async () => {
                  let res = await deleteCatesApi(row);
                  if (res.meta.state === 200) {
                    this.$notify({
                      title: res.meta.msg,
                      type: "success",
                    });
                    this.handlerInitData();
                  } else {
                    this.$notify({
                      title: res.meta.msg,
                      type: "error",
                    });
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
.cates {
  .el-table {
    margin: 10px 0;
  }

  .el-pagination {
    text-align: right;
    padding: 10px 10px 10px 0;
  }
}
</style>
