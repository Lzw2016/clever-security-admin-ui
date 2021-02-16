import path from "path";
import { ProxyConfigMap } from 'webpack-dev-server';
import { enableCDN } from './oss.config';

const { NODE_ENV, ANALYZER } = process.env;

interface Settings {
  /** 打包版本号 */
  appVersion: string | number;
  /** 项目根目录绝对路径 */
  rootPath: string;
  /** 运行模式 */
  mode: "development" | "production",
  /** dev服务配置 */
  devServer: {
    /** 绑定IP */
    host: "127.0.0.1" | "0.0.0.0",
    /** devServer 端口 */
    port: number;
    /** dev时是否需要自动打开浏览器 */
    needOpenApp: boolean;
    /** 后端接口代理配置 */
    proxy?: ProxyConfigMap;
  };
  /** 需要 Analyzer */
  needAnalyzer: boolean;
  /** HTML页面默认标题 */
  defaultTitle: string;
  /** 自定义全局变量 */
  define: {
    [name: string]: any;
  },
}

// webpack全局配置
const settings: Settings = {
  appVersion: new Date().getTime(),
  rootPath: path.resolve(__dirname, `../`),
  mode: NODE_ENV === "development" ? "development" : "production",
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    needOpenApp: false,
    proxy: {
      "/login": {
        target: "http://127.0.0.1:28081",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      "/logout": {
        target: "http://127.0.0.1:28081",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      "/current_user": {
        target: "http://127.0.0.1:28081",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      "/security": {
        target: "http://127.0.0.1:28081",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      "/api": {
        target: "http://127.0.0.1:28081",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
    },
  },
  needAnalyzer: !!ANALYZER,
  defaultTitle: "Amis Admin",
  define: {
    isProdEnv: NODE_ENV === "production",
    enableCDN: enableCDN,
  },
}

export { settings };
