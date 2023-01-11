<template>
  <qf-card
    title="商品创建"
    class-name="goodCreate"
    btn-url="/goods"
    btn-title="返回"
  >
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
  </qf-card>
</template>

<script>
import { getStoresApi } from "@/api/stores";
import { postGoodsApi } from "@/api/goods";

export default {
  async mounted() {
    let res = await getStoresApi();
    this.formItem[4].payload = res.data.list.map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    });
  },
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
          label: "商品名称",
          rules: [{ required: true, message: "商品名称必须", trigger: "blur" }],
          field: "goods_name",
          type: "input",
          payload: {
            width: 500,
          },
        },
        {
          label: "库存",
          rules: [{ required: true, message: "库存必须", trigger: "blur" }],
          field: "goods_number",
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "市场价",
          field: "market_price",
          rules: [{ required: true, message: "市场价必须", trigger: "change" }],
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "销售价",
          rules: [{ required: true, message: "销售价必须", trigger: "blur" }],
          field: "shop_price",
          type: "input",
          payload: {
            width: 300,
          },
        },
        {
          label: "所属门店",
          field: "store_id",
          rules: [{ required: true, message: "请选择", trigger: "change" }],
          placeholder: "请选择",
          type: "select",
          payload: [],
        },
        // ...
      ],
      // 表单按钮组
      formBtns: [
        {
          content: "创建",
          type: "primary",
          size: "medium ",
          click: async (formData) => {
            formData.goods_img = this.img;
            let res = await postGoodsApi(formData);
            if (res.meta.state === 201) {
              this.$notify({
                title: res.meta.msg,
                type: "success",
              });
              this.jumpFn("/goods");
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
};
</script>

<style scoped lang="scss">
.goodCreate {
  position: relative;

  ::v-deep .avatar-uploader .el-upload {
    position: absolute;
    top: 160px;
    left: 420px;
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
