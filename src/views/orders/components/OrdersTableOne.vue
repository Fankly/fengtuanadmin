<template>
  <div class="mainOneTable" ref="mainTableOne"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, BarChart, CanvasRenderer]);
export default {
  mounted() {
    this.initTableOne();
  },
  methods: {
    initTableOne() {
      const myChart = echarts.init(this.$refs.mainTableOne);
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
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      option && myChart.setOption(option);
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
.mainOneTable {
  width: 100%;
  height: 100%;
}
</style>
