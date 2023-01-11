<template>
  <qf-form
    :width="80"
    :form-item="formItem"
    :form-btns="formBtns"
    @changeData="
      (item) => {
        this.formData = item;
      }
    "
  ></qf-form>
</template>

<script>
import { getAreasApi } from "@/api/stores";
import { getCatesApi } from "@/api/cates";
export default {
  async mounted() {
    let res = await getAreasApi(this.params);
    this.formItem[1].payload.options = res.data;
    let storesRes = await getCatesApi(this.params);
    this.formItem[0].payload.options = storesRes.data.list;
  },
  data() {
    return {
      formData: {},
      formItem: [
        // ...
        {
          label: "所属分类",
          field: "cat_id",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "cascader",
          payload: {
            props: {
              label: "cat_name",
              value: "cat_id",
              children: "children",
              checkStrictly: true,
            },
            options: [],
          },
        },
        {
          label: "所属地区",
          field: "area_id",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "cascader",
          payload: {
            options: [],
            props: {
              label: "area_name",
              value: "area_id",
              children: "children",
              checkStrictly: true,
            },
          },
        },
        {
          label: "商家特色",
          field: "sjts",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "全部", value: "全部" },
            { label: "免费配送", value: "免费配送" },
            { label: "新商家", value: "新商家" },
            { label: "品牌商家", value: "品牌商家" },
            { label: "支持开票", value: "支持开票" },
          ],
        },
        {
          label: "人均价",
          field: "rjj",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "全部", value: "全部" },
            { label: "20元以下", value: "20元以下" },
            { label: "20~40元", value: "20~40元" },
            { label: "40元以上", value: "40元以上" },
          ],
        },
        {
          label: "优惠活动",
          field: "yhhd",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "全部", value: "全部" },
            { label: "优惠玩家", value: "优惠玩家" },
            { label: "折扣商品", value: "折扣商品" },
            { label: "买赠活动", value: "买赠活动" },
          ],
        },
        // ...
      ],
      // 表单按钮组
      formBtns: [],
      params: {
        pagesize: 1000,
      },
    };
  },
};
</script>

<style scoped></style>
