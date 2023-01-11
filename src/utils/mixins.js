import Vue from "vue";

Vue.mixin({
  methods: {
    jumpFn(url) {
      if (url === this.$route.path) return;
      this.$router.push(url);
    },
    confirmFn(successFn, cancelFn) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          successFn();
        })
        .catch(() => {
          /*  this.$message({
            type: "info",
            message: "已取消删除",
          }) */
          if (cancelFn) {
            cancelFn();
          } else {
            this.$message.info("已取消删除");
          }
        });
    },
  },
});
