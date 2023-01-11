<template>
  <qf-card className="orders" style="position: relative" title="订单列表">
    <el-button
      @click="handlerDownload"
      type="primary"
      round
      style="position: absolute; right: 10px; top: 10px"
    >
      导出数据
    </el-button>
    <template #filter>
      <div class="content-search">
        <el-input placeholder="订单编号" v-model="params.order_sn"></el-input>
        <el-input placeholder="下单人" v-model="params.uname"></el-input>
        <el-input placeholder="收货人" v-model="params.consignee">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handlerContentSearch"
          ></el-button>
        </el-input>
      </div>
      <el-date-picker
        v-model="params.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </template>
    <qf-table
      :columns="columns"
      :tableData="tableData"
      :stripe="true"
    ></qf-table>
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
    <OrdersEdit :state.sync="ordersEditState" :row="orderRow"></OrdersEdit>
  </qf-card>
</template>

<script>
import { download } from "excel_export_my";
import { getOrdersApi, deleteOrdersApi } from "@/api/orders";

export default {
  components: {
    OrdersEdit: () => import("./components/OrdersEdit"),
  },
  created() {
    this.handlerInitData();
  },
  watch: {
    "params.date": {
      handler() {
        this.params.start_time = this.params.date ? this.params.date[0] : "";
        this.params.end_time = this.params.date ? this.params.date[1] : "";
        this.handlerInitData(this.params);
      },
    },
  },
  methods: {
    handlerDownload() {
      //准备数据
      // let temp = [];
      // this.tableData.forEach(item=>temp.push())
      let temp = this.tableData.map((item) => {
        return {
          order_id: item.order_id,
          order_sn: item.order_sn,
          username: item.username,
          consignee: item.consignee,
          order_amount: item.order_amount,
          add_time: item.add_time,
        };
      });
      //导出数据

      download(
        "千锋&美团订单数",
        ["编号", "订单号", "下单人", "收货人", "总额", "创建于"],
        temp
      );
    },
    handlerContentSearch() {
      this.handlerInitData(this.params);
    },
    async handlerInitData() {
      let res = await getOrdersApi(this.params);
      this.tableData = res.data.list;
      this.totalPage = parseInt(res.data.total);
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
      ordersEditState: false,
      totalPage: 0,
      orderRow: {},
      params: {
        pagenum: 1,
        pagesize: 5,
        order_sn: "",
        start_time: "",
        end_time: "",
        consignee: "",
        uname: "",
        date: [],
      },
      columns: [
        {
          title: "编号",
          field: "order_id",
          width: 80,
        },
        {
          title: "订单号",
          field: "order_sn",
          width: 200,
        },
        {
          title: "下单人",
          field: "username",
          width: 100,
        },
        {
          title: "收货人",
          field: "consignee",
          width: 100,
        },
        {
          title: "总额",
          field: "order_amount",
          width: 100,
        },
        {
          title: "订单状态",
          width: 100,
          type: "tag",
          payload: {
            type: "elTagOrderFilter",
            field: "order_status",
            filterName: "orderStatusFilter",
          },
        },
        {
          title: "支付状态",
          width: 100,
          type: "tag",
          payload: {
            type: "elTagOrderFilter",
            field: "pay_status",
            filterName: "payStatusFilter",
          },
        },
        {
          title: "配送状态",
          width: 100,
          type: "tag",
          payload: {
            type: "elTagOrderFilter",
            field: "shipping_status",
            filterName: "shippingStatusFilter",
          },
        },
        {
          title: "创建于",
          field: "add_time",
          width: 180,
        },
        {
          title: "操作",
          type: "btn",
          width: "260",
          fixed: "right",
          payload: [
            {
              icon: "el-icon-edit",
              type: "primary",
              click: (row) => {
                this.orderRow = { ...row };
                this.ordersEditState = true;
                console.log(row);
              },
            },
            {
              icon: "el-icon-delete",
              type: "danger",
              click: (row) => {
                this.confirmFn(async () => {
                  let res = await deleteOrdersApi(row);
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
      tableData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.orders {
  .filter {
    display: flex;
    justify-content: space-between;

    .el-input {
      width: 200px;
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
