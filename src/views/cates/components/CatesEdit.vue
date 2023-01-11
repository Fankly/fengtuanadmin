<template>
  <el-dialog
    title="用户编辑"
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
import { getCatesApi, putCatesApi } from "@/api/cates";

export default {
  async mounted() {
    let res = await getCatesApi({
      pagesize: 1000,
    });
    this.formItem[1].payload.options = res.data.list;
  },
  data() {
    return {
      formItem: [
        {
          label: "分类名称",
          rules: [{ required: true, message: "分类名称必须", trigger: "blur" }],
          field: "cat_name",
          type: "input",
        },
        {
          label: "所属分类",
          field: "pid",
          type: "cascader",
          placeholder: "请选择",
          payload: {
            props: {
              label: "cat_name",
              value: "cat_id",
              checkStrictly: true,
            },
            options: [],
          },
        },
        {
          label: "关键词",
          field: "keywords",
          type: "input",
        },

        {
          label: "跳转网址",
          field: "url",
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
            if (formData.pid) {
              formData.pid = formData.pid.pop();
            } else {
              formData.pid = 0;
            }
            let res = await putCatesApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.catesEditState = false;
              this.$parent.$parent.$parent.handlerInitData();
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
