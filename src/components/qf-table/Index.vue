<template>
  <el-table :stripe="stripe" :data="tableData" :row-key="rowKey">
    <!--    动态生成列数-->
    <!--    colum是数组-->
    <template v-for="(column, colIndex) in columns">
      <!--      自定义填充-->
      <el-table-column
        v-if="column.type"
        :label="column.title"
        :key="colIndex"
        :width="column.width"
        :fixed="column.fixed"
      >
        <template v-slot="{ row }">
          <!-- row[column.field] 如果写死只能是boolean类型,如果传入的是Number类型不能接受 -->
          <el-switch
            v-if="column.type === 'switch'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="row[column.field]"
            @change="column.payload.change(row)"
            :active-value="column.payload.open"
            :inactive-value="column.payload.close"
          ></el-switch>
          <!-- button -->
          <template v-if="column.type === 'btn'">
            <el-button
              :size="temp.size || 'mini'"
              v-for="(temp, tempIndex) in column.payload"
              :key="tempIndex"
              :type="temp.type"
              @click="temp.click(row)"
              :icon="temp.icon"
            >
              {{ temp.name }}
            </el-button>
          </template>
          <!-- button -->

          <!-- tag组件 -->
          <template v-if="column.type === 'tag'">
            <el-tag
              :type="
                handlerFilter(
                  column.payload.type,
                  column.payload.style || row[column.payload.field]
                )
              "
            >
              {{
                handlerFilter(
                  column.payload.filterName,
                  row[column.payload.field]
                )
              }}
            </el-tag>
          </template>
          <!-- tag组件 -->

          <!-- tips组件 -->
          <template v-if="column.type === 'tips'">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                handlerFilter(
                  column.payload.filterName,
                  row[column.payload.field]
                )
              "
              placement="top"
              :enterable="false"
            >
              <span>
                {{
                  handlerFilter(
                    column.payload.filterName,
                    row[column.payload.field]
                  )
                }}
              </span>
            </el-tooltip>
          </template>
          <!-- tips组件 -->

          <!-- img组件 -->
          <template v-if="column.type === 'img'">
            <el-image
              style="width: 50px"
              :src="stringtoString(row, column)"
            ></el-image>
          </template>
          <!-- img组件 -->
        </template>
      </el-table-column>
      <!--      默认填充:直接显示原数据-->
      <el-table-column
        v-else
        :label="column.title"
        :prop="column.field"
        :key="colIndex"
        :width="column.width"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
import Vue from "vue";

export default {
  methods: {
    handlerFilter(filterName, ...params) {
      if (!filterName) {
        return;
      }
      let filterTemp = Vue.filter(filterName);
      return filterTemp(...params);
    },
    stringtoString(row, column) {
      let str = "http://tmp00001.zhaodashen.cn/";
      str += row[column.payload.field];
      return str;
    },
  },
  props: {
    rowKey: {
      type: String,
      default: "",
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin: 20px 0;

  .el-tooltip {
    border: none;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
