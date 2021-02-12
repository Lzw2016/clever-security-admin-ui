// 代理配置
const proxyConfig = {
  // 默认的代理地址
  default: 'http://172.18.1.1:18080',
  // 代理配置 - 可以配置多个
  proxy: {
    app1: 'http://172.18.1.1:18080',
  },
}

// 前端配置
const frontConfig = {
  // 前端资源文件地址
  dist: "./dist",
  // 默认首页
  index: "schema-app.html",
  // 浏览器缓存时间
  maxAge: 1000 * 60 * 60 * 24 * 30,
  // maxAge: -1,
  // 不需要浏览器缓存的文件后缀
  noNeedMaxAgeSuffix: ["/index.html", "/favicon.png", "/favicon.ico", ".html"],
};

exports.proxyConfig = proxyConfig;
exports.frontConfig = frontConfig;
