<template>
  <el-dialog
    title="权限编辑"
    :visible.sync="state"
    width="40%"
    :before-close="closeFn"
  >
    <!--    form表单-->
    <qf-form
      v-if="state"
      :width="160"
      :formItem="formItem"
      :formBtns="formBtns"
      :row="row"
    ></qf-form>
  </el-dialog>
</template>

<script>
import { getAuthsApi, putAuthsApi } from "@/api/auths";

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
          content: "更新",
          type: "primary",
          size: "medium ",
          click: async (formData) => {
            formData.auth_pid = formData.auth_father
              ? formData.auth_father.split("_")[0]
              : "";
            formData.auth_pname = formData.auth_father
              ? formData.auth_father.split("_")[1]
              : "";
            let res = await putAuthsApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.handlerInitData();
              this.$parent.$parent.$parent.authsEditState = false;
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
