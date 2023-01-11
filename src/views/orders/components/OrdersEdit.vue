<template>
  <el-dialog
    v-drag
    title="订单编辑"
    :visible.sync="state"
    width="30%"
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
import { putOrdersApi } from "@/api/orders";

export default {
  data() {
    return {
      formItem: [
        // ...
        {
          label: "配送状态",
          field: "shipping_status",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "未发货", value: "0" },
            { label: "已发货", value: "1" },
            { label: "已收货", value: "2" },
            { label: "备货中", value: "3" },
          ],
        },
        {
          label: "订单状态",
          field: "order_status",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "未确认", value: "0" },
            { label: "已确认", value: "1" },
            { label: "已取消", value: "2" },
            { label: "无效", value: "3" },
            { label: "退货", value: "4" },
          ],
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
            let res = await putOrdersApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.ordersEditState = false;
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
