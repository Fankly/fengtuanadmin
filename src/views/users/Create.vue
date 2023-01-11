<template>
  <qf-card
    title="角色创建"
    class-name="usersCreate"
    btn-title="返回"
    btn-url="/users"
  >
    <qf-form :width="80" :form-item="formItem" :form-btns="formBtns"></qf-form>
  </qf-card>
</template>

<script>
import { postUsersApi } from "@/api/users";
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
          label: "手机号",
          rules: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
          field: "mobile",
          type: "input",
        },
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
          label: "密码",
          rules: [
            { required: true, message: "密码必须", trigger: "blur" },
            { min: 6, max: 15, message: "至少6~15个字符", trigger: "blur" },
          ],
          field: "password",
          type: "password",
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
            { label: "母亲的名字", value: "你大爷名字" },
            { label: "爷爷的名字", value: "你初念的名字" },
            { label: "您其中一位老师的名字", value: "您其中唯一讲师的名字" },
          ],
        },
        {
          label: "密保答案",
          rules: [
            { required: true, message: "密保答案必须", trigger: "blur" },
            { min: 2, max: 6, message: "至少2~6个字符", trigger: "blur" },
          ],
          field: "answer",
          type: "input",
        },
      ],
      // 表单按钮组
      formBtns: [
        {
          content: "创建",
          type: "primary",
          size: "medium ",
          click: async (formData) => {
            let res = await postUsersApi(formData); //成功
            if (res.meta.state === 201) {
              this.jumpFn("/users");
            } else {
              this.$message.error(res.meta.msg);
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
};
</script>

<style scoped></style>
