<template>
  <div class="box">
    <div class="login">
      <div class="title">
        <h1>锋团本地生活管理平台</h1>
      </div>
      <div class="main">
        <qf-form :form-btns="formBtns" :form-item="formItem"></qf-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: mapActions({
    handlerLogin: "users/MB_USERS_LOGIN",
  }),

  data() {
    return {
      formItem: [
        // ...
        {
          rules: [{ required: true, message: "密保必须", trigger: "blur" }],
          payload: [
            { abel: "母亲的名字", value: "母亲的名字" },
            { abel: "爷爷的名字", value: "爷爷的名字" },
            { abel: "您其中一位老师的名字", value: "您其中一位老师的名字" },
          ],
          field: "question",
          placeholder: "请选择密保问题",
          type: "select",
        },
        {
          rules: [
            { required: true, message: "密保答案必须", trigger: "blur" },
            { min: 2, max: 8, message: "至少2~8个字符", trigger: "blur" },
          ],
          placeholder: "请选择密保答案",
          field: "answer",
          type: "input",
        },
        {
          placeholder: "请输入账号",
          rules: [
            { required: true, message: "账号必须", trigger: "blur" },
            { min: 2, max: 10, message: "至少2~10个字符", trigger: "blur" },
          ],
          field: "uname",
          type: "input",
        },
        {
          placeholder: "请输入密码",
          rules: [
            { required: true, message: "密码必须", trigger: "blur" },
            { min: 2, max: 10, message: "至少2~10个字符", trigger: "blur" },
          ],
          field: "pwd",
          type: "input",
        },

        // ...
      ],
      // 表单按钮组
      formBtns: [
        {
          icon: "el-icon-camera-solid",
          type: "primary",
          size: "small",
          click: () => {
            alert("测试");
          },
        },
        {
          icon: "el-icon-mobile-phone",
          type: "primary",
          size: "small",
          click: () => {
            this.jumpFn("/login/sms");
          },
        },
        {
          icon: "el-icon-s-claim",
          type: "primary",
          size: "small",
          click: () => {
            this.jumpFn("/login/token");
          },
        },
        {
          content: "登录",
          type: "primary",
          click: async (formData) => {
            let res = await this.handlerLogin(formData);
            if (res.meta.state === 200) {
              this.$message.success(res.meta.msg);
              this.jumpFn("/");
            } else {
              this.$message.error(res.meta.msg);
            }
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #2d3b4c;
  color: white;

  .login {
    height: 377px;
    width: 320px;

    .main {
      :deep(.el-button) {
        font-size: 14px;
        height: 44px;
      }

      :deep(.el-button) {
        &:last-of-type {
          width: calc(100% - 168px);
        }
      }
    }

    :deep(.el-select) {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
