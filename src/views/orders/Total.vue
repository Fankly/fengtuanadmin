<template>
  <qf-card title="订单统计" class-name="ordersTotal">
    <div class="total">
      <div class="box">
        <div class="order_name">本月销售量</div>
        <div class="orderNum">
          <countTo
            :autoplay="true"
            :startVal="1000"
            :endVal="tableData.now_month_total"
            :duration="2000"
          ></countTo>
        </div>
      </div>
      <div class="box">
        <div class="order_name">上月销售量</div>
        <div class="orderNum">
          <countTo
            :autoplay="true"
            :startVal="1000"
            :endVal="parseInt(tableData.prev_month_total)"
            :duration="2000"
          ></countTo>
        </div>
      </div>
      <div class="box">
        <div class="order_name">总库存</div>
        <div class="orderNum">
          <countTo
            :autoplay="true"
            :startVal="1000"
            :endVal="parseInt(tableData.goods_total_number)"
            :duration="2000"
          ></countTo>
        </div>
      </div>
      <div class="box">
        <div class="order_name">本月新注册用户</div>
        <div class="orderNum">
          <countTo
            :autoplay="true"
            :startVal="1000"
            :endVal="parseInt(tableData.now_month_reg)"
            :duration="2000"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="ordersLine">
      <OrdesrLine
        ref="line"
        :data="tableData.reg_data"
        :title="tableData.reg_title"
      ></OrdesrLine>
    </div>
    <div class="ordersBar">
      <div class="shadow">
        <OrdersTableOne
          :data="tableData.pv_data"
          :title="tableData.pv_title"
        ></OrdersTableOne>
      </div>
      <div class="shadow">
        <OrdersTableTwo
          :data="tableData.store_data"
          :title="tableData.store_title"
        ></OrdersTableTwo>
      </div>
    </div>
  </qf-card>
</template>

<script>
import countTo from "vue-count-to";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      tableData: {
        goods_total_number: 0,
        now_month_reg: 0,
        now_month_total: 0,
        prev_month_total: 0,
        pv_data: [],
        pv_title: [],
        reg_data: [],
        reg_title: [],
        store_data: [],
        store_title: [],
      },
    };
  },
  created() {
    this.handlerInitData();
    setInterval(() => {
      this.handlerInitData();
    }, 5000);
  },
  methods: {
    ...mapActions({
      handlerTotalOrders: "orders/TOTAL_ORDERS_API",
    }),
    handlerInitData() {
      this.handlerTotalOrders().then((res) => {
        res.data.now_month_total = res.data.now_month_total || 0;
        this.tableData = res.data;
      });
    },
  },
  computed: {
    ...mapState(["now_month_total"]),
  },
  components: {
    OrdesrLine: () => import("./components/OrdersLine"),
    OrdersTableOne: () => import("./components/OrdersTableOne.vue"),
    OrdersTableTwo: () => import("./components/OrdersTableTwo.vue"),
    countTo,
  },
};
</script>

<style lang="scss" scoped>
.ordersTotal {
  .ordersBar {
    margin-top: 30px;

    display: flex;
    justify-content: space-between;
    .shadow {
      width: 49%;
      height: 300px;
    }
  }
  .ordersLine,
  .ordersBar {
    width: 100%;
  }
  .ordersLine,
  .shadow {
    margin-top: 30px;
    height: 300px;
    box-shadow: 0 0 5px 1px #ccc;
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: white;
    .box {
      width: 22%;
      box-shadow: -3px -4px 5px #ccc;
      padding: 10px;
      border-radius: 10px;
      &:first-of-type {
        background: #db5995;
      }
      &:nth-of-type(2) {
        background: #6dc894;
      }
      &:nth-of-type(3) {
        background: #cfbd83;
      }
      &:last-of-type {
        background: #4d9ec5;
      }

      .orderNum {
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
}
</style>
