<template>
  <el-card :class="className">
    <!--    标题-->
    <div class="title" slot="header">
      <span>{{ title }}</span>
      <el-button round v-if="btnUrl" type="primary" @click="jumpFn(btnUrl)">
        {{ btnTitle }}
      </el-button>
    </div>
    <!--    内容:筛选-->
    <div class="filter">
      <slot name="filter"></slot>
    </div>
    <!--    其他-->
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    btnTitle: {
      type: String,
    },
    btnUrl: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  .title,
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
