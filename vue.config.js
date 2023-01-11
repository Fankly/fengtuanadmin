const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // _dirname当前文件所在目录 项目根目录
        // path.resolve 拼接目录 window \ linux /
        // window 项目根路径\src
        // linux 项目根路径/src
        "@": path.resolve(__dirname, "src"),
        "~mock": path.resolve(__dirname, "mock"),
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://kg.zhaodashen.cn/mt/admin",
        changeOrigin: true, // 是否允许跨域
        secure: false, // 关闭SSL证书验证https协议接口需要改成true
        pathRewrite: {
          // 重写路径请求
          "^/api": "", //路径重写
        },
      },
      // ....
    },
  },
};
