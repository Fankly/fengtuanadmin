<template>
  <qf-card
    className="goods"
    title="商品列表"
    btnTitle="创建"
    btnUrl="/goods/create"
  >
    <template #filter>
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="params.goods_name"
      >
        <el-button
          @click="handlerGoodsSearch"
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
    <qf-table :columns="columns" :tableData="tableData"></qf-table>
    <!--    分页-->
    <el-pagination
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
import { deleteGoodsApi, getGoodsApi } from "@/api/goods";

export default {
  watch: {
    "params.date": {
      handler() {
        this.params.start_time = this.params.date ? this.params.date[0] : "";
        this.params.end_time = this.params.date ? this.params.date[1] : "";
        this.handlerInitData(this.params);
      },
    },
  },
  created() {
    this.handlerInitData();
  },
  methods: {
    handlerGoodsSearch() {
      this.handlerInitData(this.params);
    },
    async handlerInitData() {
      let res = await getGoodsApi(this.params);
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
      totalPage: 0,
      params: {
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
        goods_name: "",
        date: [],
      },
      tableData: [],
      columns: [
        {
          title: "编号",
          field: "goods_id",
        },
        {
          title: "封面",
          type: "img",
          payload: {
            field: "goods_img",
          },
        },
        {
          type: "tips",
          title: "标题",
          payload: {
            field: "goods_name",
            filterName: "substrFilter",
          },
        },
        {
          title: "库存",
          field: "goods_number",
        },
        {
          title: "市场价",
          field: "market_price",
        },
        {
          title: "促销价",
          field: "shop_price",
        },
        {
          width: 180,
          title: "创建于",
          field: "create_time",
        },
        {
          title: "操作",
          type: "btn",
          width: "260",
          payload: [
            {
              name: "修改商品",
              type: "primary",
              click: (row) => {
                console.log(row);
              },
            },
            {
              name: "删除",
              type: "danger",
              click: async (row) => {
                let res = await deleteGoodsApi(row);
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
              },
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
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
</style>
