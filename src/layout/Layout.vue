<template>
  <div class="layout">
    <!--   <div class="menu"></div> -->
    <Menu :width="width"></Menu>
    <div class="main">
      <!-- top -->
      <Top
        @changeMenuWidth="
          (state) => {
            width = state ? 200 : 64;
          }
        "
      ></Top>
      <!-- content -->
      <div class="content">
        <!-- <h1 v-for="item in 100" :key="item">测试</h1> -->
        <transition appear name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 200,
    };
  },
  components: {
    Menu: () => import("./components/Menu.vue"),
    Top: () => import("./components/Top.vue"),
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;

  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    // 切记切记切记:el-table超出整个网页内容
    overflow: hidden;
    background-color: #fff;
    // left
  }

  .content {
    width: 96%;
    height: 100%;
    margin: auto;
    overflow-y: scroll;
  }
}
</style>
