<template>
  <div class="box">
    <div class="login">
      <div class="title">
        <h1>令牌登录</h1>
      </div>
      <div class="main">
        <div class="form">
          <qf-form :form-btns="formBtns" :form-item="formItem"></qf-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      handlerTokenLogin: "users/MOBILE_USERS_TOKEN",
    }),
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码格式不正确"));
      }
    };

    return {
      formItem: [
        // ...
        {
          rules: [
            { required: true, message: "密保答案必须", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
          placeholder: "请选择账号或手机号",
          field: "account",
          type: "input",
        },
        {
          placeholder: "请输入动态验证码",
          rules: [
            { required: true, message: "动态验证码必须", trigger: "blur" },
            { min: 5, max: 6, message: "请输入5或6位验证码", trigger: "blur" },
          ],
          field: "token",
          type: "input",
        },

        // ...
      ],
      // 表单按钮组
      formBtns: [
        {
          icon: "el-icon-back",
          size: "small",
          click: () => {
            this.jumpFn("/login");
          },
        },
        {
          content: "登录",
          type: "primary",
          click: async (formData) => {
            let res = await this.handlerTokenLogin(formData);
            if (res.meta.state === 200) {
              this.$message.success(res.meta.msg);
              this.jumpFn("/Welcome");
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

  h1 {
    text-align: center;
  }

  .login {
    width: 320px;

    .title {
      margin-bottom: 20px;
    }

    .main {
      position: relative;

      .form {
        :deep(.el-button) {
          font-size: 14px;
          height: 44px;
          width: 62px;

          &:last-of-type {
            width: calc(100% - 72px);
          }
        }
      }
    }
  }
}
</style>
