### 快速开始

##### 1.安装Node.js(建议12.x版本)

下载地址: [https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)

```shell
// 配置npm源
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```

##### 2.安装yarn

```shell
npm install -g yarn
yarn -v
```

```shell
// 配置yarn源
yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
```

##### 3.安装TypeScript

```shell
yarn global add typescript
tsc -v
```

##### 4.初始化 & 开发

```shell
cd ./amis-admin
// 初始化
yarn run project-init
// 开发
yarn run dev
```

> 建议使用`IntelliJ IDEA`或者`WebStorm`开发工具
