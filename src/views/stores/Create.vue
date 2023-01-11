<template>
  <qf-card
    title="门店创建"
    class-name="storesCreate"
    btn-title="返回"
    btn-url="/stores"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <BaseMessage ref="baseMessage"></BaseMessage>
        <el-button type="primary" @click="handlerCreate">创建</el-button>
      </el-tab-pane>
      <el-tab-pane label="门店筛选" name="second">
        <stores-filters ref="storesFilters"></stores-filters>
      </el-tab-pane>
      <el-tab-pane label="门店相册" name="third">
        <StoresPicture ref="storesPicture"></StoresPicture>
      </el-tab-pane>
      <el-tab-pane label="门店地图" name="fourth">
        <StoresMap ref="storesMap"></StoresMap>
      </el-tab-pane>
    </el-tabs>
  </qf-card>
</template>

<script>
import { postStoresApi } from "@/api/stores";
export default {
  components: {
    BaseMessage: () => import("./components/BaseMessage"),
    StoresFilters: () => import("./components/StoresFilters"),
    StoresPicture: () => import("./components/StoresPicture"),
    StoresMap: () => import("./components/StoresMap"),
  },
  methods: {
    async handlerCreate() {
      let postData = {};
      // 门店相册
      this.$refs.baseMessage.$children[0].$children[0].validate((isSuccess) => {
        if (isSuccess) {
          postData.avg_price =
            this.$refs.baseMessage.$children[0].formData.avg_price;
          postData.send_price =
            this.$refs.baseMessage.$children[0].formData.send_price;
          postData.start_price =
            this.$refs.baseMessage.$children[0].formData.start_price;
          postData.tel = this.$refs.baseMessage.$children[0].formData.tel;
          postData.title = this.$refs.baseMessage.$children[0].formData.title;
          postData.work_time =
            this.$refs.baseMessage.$children[0].formData.work_time;
          postData.img = this.$refs.baseMessage.img;
        }
      });

      // 门店筛选
      this.$refs.storesFilters.$children[0].$children[0].validate(
        (isSuccess) => {
          if (isSuccess) {
            postData.area_id =
              this.$refs.storesFilters.$children[0].formData.area_id.pop();
            postData.cat_id =
              this.$refs.storesFilters.$children[0].formData.cat_id.pop();
            postData.rjj = this.$refs.storesFilters.$children[0].formData.rjj;
            postData.sjts = this.$refs.storesFilters.$children[0].formData.sjts;
            postData.yhhd = this.$refs.storesFilters.$children[0].formData.yhhd;
          }
        }
      );
      // 门店相册
      if (this.$refs.storesPicture.imgs.length !== 0) {
        postData.imgs = this.$refs.storesPicture.imgs;
      }
      // 门店地图 lat lng 坐标
      if (this.$refs.storesMap.position != null) {
        postData.lat = this.$refs.storesMap.position.lat;
        postData.lng = this.$refs.storesMap.position.lng;
      }
      let res = await postStoresApi(postData);
      if (res.meta.state === 201) {
        this.$notify({
          title: res.meta.msg,
          type: "success",
        });
        this.jumpFn("/stores");
      } else {
        this.$notify({
          title: res.meta.msg,
          type: "error",
        });
      }
    },
  },
  data() {
    return {
      formData: {},
      activeName: "first",
    };
  },
};
</script>

<style scoped lang="scss">
.storesCreate {
  .el-tabs {
    .el-tab-pane {
      .el-button {
        margin-left: 80px;
      }
    }
  }
}
</style>
