<template>
  <div class="baseMessage">
    <qf-form :width="80" :form-item="formItem" :form-btns="formBtns"></qf-form>
    <el-upload
      class="avatar-uploader"
      action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.meta.state === 201) {
        this.img = res.data.img;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  data() {
    return {
      img: "",
      imageUrl: "",
      formItem: [
        // ...
        {
          label: "标题",
          rules: [{ required: true, message: "标题必须", trigger: "blur" }],
          field: "title",
          type: "input",
          payload: {
            width: 500,
          },
        },
        {
          label: "起送",
          rules: [{ required: true, message: "起送必须", trigger: "blur" }],
          field: "start_price",
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "夜间配送",
          field: "send_price",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "人均",
          rules: [{ required: true, message: "人均必须", trigger: "blur" }],
          field: "avg_price",
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "电话",
          rules: [{ required: true, message: "电话必须", trigger: "blur" }],
          field: "tel",
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "营业时间",
          rules: [{ required: true, message: "营业时间必须", trigger: "blur" }],
          field: "work_time",
          type: "input",
          payload: {
            width: 300,
          },
        },
        // ...
      ],
      // 表单按钮组
      formBtns: [],
    };
  },
};
</script>

<style scoped lang="scss">
.baseMessage {
  position: relative;

  ::v-deep .avatar-uploader .el-upload {
    position: absolute;
    top: 80px;
    left: 400px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
