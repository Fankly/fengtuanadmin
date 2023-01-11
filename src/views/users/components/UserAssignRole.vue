<!--用户分配角色-->
<template>
  <el-dialog
    title="提示"
    :visible.sync="state"
    width="30%"
    :before-close="closeFn"
  >
    <qf-form
      :row="row"
      :width="80"
      :formItem="formItem"
      :formBtns="formBtns"
    ></qf-form>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from "@/api/roles";
import { putUsersAssignApi } from "@/api/users";

export default {
  async created() {
    let res = await getRolesApi();
    this.formItem[2].payload = res.data.map((item) => {
      return {
        label: item.role_name,
        value: item.role_id,
      };
    });
  },
  data() {
    return {
      formItem: [
        // ...
        {
          label: "当前用户",
          field: "username",
          type: "input",
          disabled: true,
        },
        {
          label: "当前角色",
          disabled: true,
          field: "role_name",
          type: "input",
        },
        {
          label: "选择角色",
          field: "role_id",
          placeholder: "请选择",
          type: "select",
          payload: [],
        },
      ],
      // 表单按钮组
      formBtns: [
        {
          content: "更新",
          type: "primary",
          size: "medium ",
          click: async (formData) => {
            let res = await putUsersAssignApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.handlerInitData();
              this.$parent.$parent.$parent.UserAssignRoleState = false;
            } else {
              this.$notify({
                title: res.meta.msg,
                type: "error",
              });
            }
          },
        },
        {
          content: "重置",
          size: "medium ",
        },
      ],
    };
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeFn() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
