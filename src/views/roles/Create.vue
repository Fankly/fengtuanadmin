<template>
  <qf-card
    title="角色创建"
    class-name="rolesCreate"
    btn-title="返回"
    btn-url="/roles"
  >
    <qf-form :width="80" :form-item="formItem" :form-btns="formBtns"></qf-form>
  </qf-card>
</template>

<script>
import { postRolesApi } from "@/api/roles";

export default {
  data() {
    return {
      formItem: [
        // ...
        {
          label: "角色名",
          width: 100,
          rules: [
            { required: true, message: "用户名必须", trigger: "blur" },
            { min: 3, max: 10, message: "至少3~10个字符", trigger: "blur" },
          ],
          field: "role_name",
          type: "input",
        },
        {
          label: "角色描述",
          width: 100,
          rules: [
            { required: true, message: "密码必须", trigger: "blur" },
            { min: 3, max: 10, message: "至少3~10个字符", trigger: "blur" },
          ],
          field: "role_describe",
          type: "input",
        },
        // ...
      ],
      // 表单按钮组
      formBtns: [
        {
          content: "创建",
          size: "primary",
          click: async (formData) => {
            let res = await postRolesApi(formData);
            if (res.meta.state === 201) {
              this.$message.success(res.meta.msg);
              this.jumpFn("/roles");
            } else {
              this.$message.error(res.meta.msg);
            }
          },
        },
        {
          content: "重置",
          size: "primary",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
