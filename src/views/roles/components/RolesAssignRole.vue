<!--角色分配权限-->
<template>
  <el-dialog
    title="提示"
    :visible.sync="state"
    width="30%"
    :before-close="closeFn"
  >
    <el-tree
      ref="tree"
      v-if="state"
      :data="data"
      show-checkbox
      node-key="auth_id"
      :default-expand-all="false"
      :default-checked-keys="
        row.auth_ids_son ? row.auth_ids_son.split(',') : []
      "
      :props="defaultProps"
    >
    </el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="handlerSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAuthsApi } from "@/api/auths";
import { putAssignAuthsApi } from "@/api/roles";

export default {
  async created() {
    let res = await getAuthsApi();
    this.data = res.data;
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "auth_name",
        value: "auth_id",
      },
    };
  },
  props: {
    handlerInitData: {
      type: Function,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handlerSubmit() {
      //  数据里面是一个一个数据 auth_id
      //  console.log(12,this.$refs.tree.getCheckedKeys());
      //  获取的是对象 对象里面包含了auth_id、auth_pid
      //  console.log(this.$refs.tree.getCheckedNodes());
      //  1.定义变量存放勾选的数据,所有父子的编号、所有子的编号
      let chooseData = this.$refs.tree.getCheckedNodes();
      let allFatherSonIds = [];
      let allSonIds = [];
      //  2.过滤数据(重点)
      chooseData.forEach((item) => {
        // item就是勾选的对象
        //  父+子
        if (item.auth_pid != 0) {
          //就是子
          allFatherSonIds.push(item.auth_id); //收集当前子
          allFatherSonIds.push(item.auth_pid); //收集当前父
          //  收集:子
          allSonIds.push(item.auth_id);
        }
      });
      allFatherSonIds = [...new Set(allFatherSonIds)];
      //  3.请求接口
      let res = await putAssignAuthsApi({
        role_id: this.row.role_id,
        auth_ids: allFatherSonIds,
        auth_ids_son: allSonIds,
      });
      if (res.meta.state === 200) {
        this.$notify({
          title: res.meta.msg,
          type: "success",
        });
        this.handlerInitData();
        this.closeFn();
      } else {
        this.$notify({
          title: res.meta.msg,
          type: "error",
        });
      }
    },
    closeFn() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
