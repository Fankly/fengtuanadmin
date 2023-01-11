<template>
  <div class="menu" :style="{ width: width + 'px' }">
    <el-menu
      :default-active="defaultActive"
      :collapse="width !== 200"
      background-color="#2d3a4b"
      text-color="#fff"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(oneItem, oneIndex) in menuData">
        <el-submenu :key="oneIndex" :index="oneIndex + ''">
          <template slot="title">
            <i class="iconfont icon-caidan"></i>
            <span slot="title">{{ oneItem.auth_name }}</span>
          </template>
          <template v-for="(twoItem, twoIndex) in oneItem.children">
            <el-menu-item
              @click="jumpFn(twoItem.url)"
              :index="oneIndex + '-' + twoIndex"
              :key="twoIndex"
            >
              <i class="iconfont icon-shezhi"></i>
              {{ twoItem.auth_name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      menuData: (state) => state.auths.menu,
    }),
  },
  watch: {
    $route: {
      handler(to) {
        this.menuData.forEach((oneItem, oneIndex) => {
          if (oneItem.children) {
            oneItem.children.forEach((twoItem, twoIndex) => {
              if (to.path === twoItem.url) {
                this.defaultActive = `${oneIndex}-${twoIndex}`;
              }
            });
          }
        });
      },
      immediate: true,
    },
  },
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isCollapse: false,
      defaultActive: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu {
  width: 200px;
  height: 100%;
  background-color: #2d3a4b;
  transition: width 0.3s linear;

  .el-menu {
    border: none;

    .iconfont {
      font-size: 18px;
      font-weight: 700;
      margin-right: 5px;
    }
  }
}
</style>
