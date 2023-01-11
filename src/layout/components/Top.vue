<template>
  <div class="top">
    <!-- left -->
    <div class="left">
      <div class="btn" @click="menuChange()">
        <i
          :class="{
            'el-icon-s-fold': iconChangeOpen,
            'el-icon-s-unfold': !iconChangeOpen,
          }"
        ></i>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.name1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>
          <transition appear name="breadcrumb" mode="out-in">
            <div :key="$route.meta.name2">
              {{ $route.meta.name2 }}
            </div>
          </transition>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- right -->
    <div class="right">
      <span>{{ uname }}（{{ roleName }}）</span>
      <i class="el-icon-switch-button" @click="closeUser"></i>
      <i class="el-icon-full-screen" v-screenfull></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    roleName: (state) => state.users.roleName,
    uname: (state) => state.users.uname,
    menuData: (state) => state.auths.menu,
  }),
  data() {
    return {
      iconChangeOpen: true,
    };
  },
  methods: {
    closeUser() {
      localStorage.clear();
      this.menuData.length = 0;
      this.jumpFn("/login");
    },
    menuChange() {
      this.iconChangeOpen = !this.iconChangeOpen;
      this.$emit("changeMenuWidth", this.iconChangeOpen);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .left,
  .right {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .btn {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
      cursor: pointer;
    }
  }

  // right
  .right {
    justify-content: flex-end;

    i {
      font-size: 20px;
      margin-right: 10px;

      &:hover {
        cursor: pointer;
        color: #409eff;
      }

      &:last-child {
        margin-right: 100px;
      }
    }
  }
}
</style>
