<template>
  <div class="mainTwoTable" ref="mainTableTwo"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, BarChart, CanvasRenderer]);
export default {
  mounted() {
    this.initTableTwo();
  },
  methods: {
    initTableTwo() {
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
  watch: {
    title() {
      this.initTableTwo();
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
  data() {
    return {
      tableData: {},
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.mainTwoTable {
  width: 100%;
  height: 100%;
}
</style>
