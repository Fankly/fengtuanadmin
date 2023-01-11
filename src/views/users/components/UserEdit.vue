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
import { putUsersApi } from "@/api/users";

export default {
  data() {
    //自定义验证规则
    const checkMobile = (rules, value, callback) => {
      if (/^1\d{10}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式有误"));
      }
    };
    return {
      formItem: [
        // ...
        {
          label: "用户名",
          rules: [
            { required: true, message: "用户名必须", trigger: "blur" },
            { min: 2, max: 10, message: "至少2~10个字符", trigger: "blur" },
          ],
          field: "username",
          type: "input",
        },
        {
          label: "手机号",
          rules: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
          field: "mobile",
          type: "input",
        },
        {
          label: "密保问题",
          field: "question",
          rules: [
            { required: true, message: "请选择密保问题", trigger: "change" },
          ],
          placeholder: "请选择",
          type: "select",
          payload: [
            { label: "你母亲的名字", value: "你母亲的名字" },
            { label: "你爷爷的名字", value: "你爷爷的名字" },
            { label: "您其中一位老师的名字", value: "您其中一位老师的名字" },
          ],
        },
        {
          label: "密保答案",
          rules: [
            { required: true, message: "密保答案必须", trigger: "blur" },
            { min: 2, max: 8, message: "至少2~8个字符", trigger: "blur" },
          ],
          field: "answer",
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
            let res = await putUsersApi(formData);
            if (res.meta.state === 200) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.$parent.$parent.$parent.handlerInitData();
              this.$parent.$parent.$parent.userEditState = false;
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
