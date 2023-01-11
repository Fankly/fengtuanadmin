<template>
  <div class="box">
    <div class="login">
      <div class="title">
        <h1>短信登录</h1>
      </div>
      <div class="main">
        <div class="form">
          <qf-form
            ref="form"
            :form-btns="formBtns"
            :form-item="formItem"
          ></qf-form>
        </div>
        <div class="checkCode">
          <el-button :disabled="this.smsTime !== 10" @click="handlerGetCode">{{
            smsCode
          }}</el-button>
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
      handlerMobileLogin: "users/MOBILE_USERS_LOGIN",
      handlerMobileSend: "users/MOBILE_SEND",
    }),
    async handlerGetCode() {
      if (
        this.$refs.form.formData.mobile &&
        this.$refs.form.formData.mobile.length === 11
      ) {
        await this.handlerMobileSend({
          mobile: this.$refs.form.formData.mobile,
        });
        this.smsTime--;
        this.smsCode = `重新获取(${this.smsTime})`;
        let timer = setInterval(() => {
          if (this.smsTime <= 1) {
            clearInterval(timer);
            this.smsTime = 10;
            this.smsCode = "获取验证码";
            return;
          }
          this.smsTime--;
          this.smsCode = `重新获取(${this.smsTime})`;
        }, 1000);
      } else {
        this.$message.error("请输入正确的手机号码");
      }
    },
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码不正确"));
      }
    };
    return {
      smsCode: "获取验证码",
      smsTime: 10,
      formItem: [
        // ...
        {
          rules: [
            { required: true, message: "手机号码必须", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
          placeholder: "请选择手机号",
          field: "mobile",
          type: "input",
        },
        {
          placeholder: "请输入动态验证码",
          rules: [
            { required: true, message: "动态验证码必须", trigger: "blur" },
            { min: 4, max: 4, message: "请输入4位验证码", trigger: "blur" },
          ],
          field: "code",
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
            let res = await this.handlerMobileLogin(formData);
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

      .checkCode {
        position: absolute;
        top: 64px;
        right: 0;

        :deep(.el-button) {
          border: none;
        }
      }
    }
  }
}
</style>
