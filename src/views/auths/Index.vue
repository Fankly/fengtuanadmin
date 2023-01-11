<template>
  <qf-card
    class-name="auths"
    title="权限列表"
    btn-title="权限创建"
    btn-url="/auths/create"
  >
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="tableData"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="handlerEdit(node, data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="deleteFn(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <AuthsEdit :row="authsRow" :state.sync="authsEditState"></AuthsEdit>
  </qf-card>
</template>

<script>
import { getAuthsApi, deleteAuthsApi } from "@/api/auths";

export default {
  created() {
    this.handlerInitData();
  },
  components: {
    AuthsEdit: () => import("./components/AuthsEdit"),
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    handlerEdit(node, data) {
      // 有bug,如果不修改所属权限,修改其他属性,会报参数错误 解决办法:加判断
      if (data.auth_pname) {
        data.auth_father = `${data.auth_pid}_${data.auth_pname}`;
      } else {
        data.auth_father = data.auth_pname;
      }
      this.authsRow = { ...data };
      this.authsEditState = true;
    },
    async handlerInitData() {
      let res = await getAuthsApi();
      this.tableData = res.data;
    },
    deleteFn(node, data) {
      this.confirmFn(async () => {
        let res = await deleteAuthsApi(data);
        if (res.meta.state === 200) {
          this.$message.success(res.meta.msg);
          this.handlerInitData();
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
  data() {
    return {
      authsRow: {},
      authsEditState: false,
      filterText: "",
      tableData: [],
      defaultProps: {
        children: "children",
        label: "auth_name",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.auths {
  ::v-deep .el-tree-node__content {
    padding: 8px 0px;
  }

  .el-button {
    margin: 0 6px;
  }

  ::v-deep .el-dialog {
    box-shadow: none;
  }
}
</style>
