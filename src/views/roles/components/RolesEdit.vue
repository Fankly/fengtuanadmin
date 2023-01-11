<template>
  <el-dialog
    title="角色编辑"
    :visible.sync="state"
    width="30%"
    :before-close="closeFn"
  >
    <!--    form表单-->
    <qf-form
      v-if="state"
      :row="row"
      :width="80"
      :formItem="formItem"
      :formBtns="formBtns"
    ></qf-form>
  </el-dialog>
</template>

<script>
import { putRolesApi } from "@/api/roles";

export default {
  data() {
    return {
      formItem: [
        // ...
        {
          label: "角色名称",
          rules: [
            { required: true, message: "角色名称必须", trigger: "blur" },
            { min: 2, max: 10, message: "至少2~10个字符", trigger: "blur" },
          ],
          field: "role_name",
          type: "input",
        },
        {
          label: "角色描述",
          rules: [
            { required: true, message: "角色描述必须", trigger: "blur" },
            { min: 2, max: 10, message: "至少2~10个字符", trigger: "blur" },
          ],
          field: "role_describe",
          type: "input",
        },
      ],
      // 表单按钮组
      formBtns: [
        {
          content: "更新",
          type: "primary",
          size: "medium ",
          click: async (formData) => {
            let res = await putRolesApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.handlerInitData();
              this.$parent.$parent.$parent.rolesEditState = false;
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
      this.$emit("update:state", false);
    },
  },
};
</script>

<style scoped></style>
