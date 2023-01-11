<template>
  <div class="mainTable" ref="mainTableTwo"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    this.initTable();
  },
  methods: {
    initTable() {
      const myChart = echarts.init(this.$refs.mainTableTwo);
      const option = {
        xAxis: {
          type: "category",
          data: this.title,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data,
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  watch: {
    title() {
      this.initTable();
    },
  },
  props: {
    title: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.mainTable {
  width: 100%;
  height: 100%;
}
</style>
