<template>
  <el-upload
    action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-success="handleAvatarSuccess"
  >
    <i class="el-icon-plus"></i>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      imgs: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.meta.state === 201) {
        this.$message.success(res.meta.msg);
        this.img = res.data.img;
        this.imgs.push(this.img);
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped></style>
