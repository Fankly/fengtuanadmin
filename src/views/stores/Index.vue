<template>
  <qf-card
    className="stores"
    title="门店列表"
    btnUrl="/stores/create"
    btnTitle="创建"
  >
    <qf-table :columns="columns" :tableData="tableData"></qf-table>
    <!--    分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    ></el-pagination>
  </qf-card>
</template>

<script>
import { getStoresApi, deleteStoresApi } from "@/api/stores";

export default {
  created() {
    this.handlerInitData();
  },
  methods: {
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
      let res = await getStoresApi(this.params);
      this.tableData = res.data.list;
      this.totalPage = parseInt(res.data.total);
    },
  },
  data() {
    return {
      totalPage: 0,
      params: {
        pagenum: 1,
        pagesize: 2,
        title: "",
        start_time: "",
        end_time: "",
      },
      columns: [
        {
          title: "编号",
          field: "id",
        },
        {
          title: "封面",
          type: "img",
          payload: {
            field: "img",
          },
        },
        {
          width: 200,
          title: "标题",
          type: "tips",
          payload: {
            field: "title",
            filterName: "substrFilter",
          },
        },
        {
          title: "好评",
          field: "comment_good_count",
        },
        {
          title: "差评",
          field: "comment_bad_count",
        },
        {
          title: "总评",
          field: "comment_count",
        },
        {
          title: "销量",
          field: "sell_count",
        },
        {
          width: "120",
          title: "联系方式",
          field: "tel",
        },
        {
          width: 170,
          title: "营业时间",
          field: "work_time",
        },
        {
          fixed: "right",
          type: "btn",
          title: "操作",
          width: "300",
          payload: [
            {
              name: "修改门店",
              type: "primary",
              click: (row) => {
                console.log(row);
              },
            },
            {
              name: "删除",
              type: "danger",
              click: (row) => {
                this.confirmFn(async () => {
                  row.store_id = row.id;
                  let res = await deleteStoresApi(row);
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
      tableData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.stores {
  .el-table {
    margin: 10px 0;
  }

  .el-pagination {
    text-align: right;
    padding: 10px 10px 10px 0;
  }
}
</style>
