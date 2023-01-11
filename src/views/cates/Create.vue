<template>
  <qf-card
    className="catesCreate"
    title="分类创建"
    btnUrl="/cates"
    btnTitle="返回"
  >
    <qf-form :width="80" :formItem="formItem" :formBtns="formBtns"></qf-form>
  </qf-card>
</template>

<script>
import { getCatesApi, postCatesApi } from "@/api/cates";

export default {
  async mounted() {
    let res = await getCatesApi(this.params);
    this.formItem[1].payload.options = res.data.list;
  },
  data() {
    return {
      params: {
        pagesize: 1000,
      },
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
      formBtns: [
        {
          content: "创建",
          size: "primary",
          click: async (formData) => {
            if (formData.pid) {
              formData.pid = formData.pid.pop();
            } else {
              formData.pid = 0;
            }
            let res = await postCatesApi(formData);
            if (res.meta.state === 201) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.jumpFn("/cates");
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
          size: "primary",
        },
      ],
    };
  },
};
</script>

<style></style>
