<template>
  <qf-card
    title="权限创建"
    class-name="authsCreate"
    btn-title="返回"
    btn-url="/auths"
  >
    <qf-form :width="160" :form-item="formItem" :form-btns="formBtns"></qf-form>
  </qf-card>
</template>

<script>
import { postAuthsApi, getAuthsApi } from "@/api/auths";

export default {
  async created() {
    let res = await getAuthsApi();
    this.formItem[2].payload = res.data.map((item) => {
      return {
        label: item.auth_name,
        value: `${item.auth_id}_${item.auth_name}`,
      };
    });
  },
  data() {
    return {
      formItem: [
        // ...
        {
          label: "权限名称",
          rules: [
            { required: true, message: "权限名称必须", trigger: "blur" },
            { min: 3, max: 5, message: "至少3~5个字符", trigger: "blur" },
          ],
          field: "auth_name",
          type: "input",
        },
        {
          label: "权限后访问地址",
          rules: [
            { required: true, message: "权限后访问地址", trigger: "blur" },
          ],
          field: "url",
          type: "input",
        },
        {
          label: "所属权限",
          field: "auth_father",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [],
        },
        {
          label: "是否缓存组件",
          field: "keep_alive",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "不缓存", value: "0" },
            { label: "缓存", value: "1" },
          ],
        },
        {
          label: "权限组件路径",
          rules: [
            { required: true, message: "权限组件路径必须", trigger: "blur" },
          ],
          field: "component",
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
            formData.auth_pid = formData.auth_father
              ? formData.auth_father.split("_")[0]
              : "";
            formData.auth_pname = formData.auth_father
              ? formData.auth_father.split("_")[1]
              : "";
            let res = await postAuthsApi(formData);
            if (res.meta.state === 201) {
              this.$message.success(res.meta.msg);
              this.jumpFn("/auths");
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
