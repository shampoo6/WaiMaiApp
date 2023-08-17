# 支付集成

## 支付宝

### 环境搭建

#### 开通应用

在支付宝开放平台创建应用

绑定业务的时候选择 `网页/移动app支付` 有其他需要也可以绑定其他支付

下载 [支付宝开放平台密钥工具](https://ideservice.alipay.com/ide/getPluginUrl.htm?clientType=assistant&platform=win&channelType=WEB)

按步骤生成 RSA 钥匙对并上传公钥，保存一下几个密钥

1. 应用公钥
2. 应用私钥
3. 支付宝公钥

#### 下载沙箱APP

[下载沙箱APP](https://u.alipay.cn/_3qjuojwqOOw)

安装后，在沙箱控制台中查找对应的账号密码登录即可，若要使用支付，应该使用买家信息登录

### 支付流程

基本上的流程如下:

- app端调用开发服务器支付接口
- 开发服务器调用支付宝API生成订单信息，然后支付宝会根据接口类型不同返回订单参数，可能是querystring参数，也可能是表单html，视不同支付API而定
- 将支付宝返回参数给app
- app中调用uni-app的支付接口，或者直接向支付宝发起http请求
- 在支付宝沙箱APP或网页中进行支付测试
- 支付完成后，开发服务器接收支付宝的异步通知
- 开发服务器通知页面更新状态

### 开发服务器

[下载服务器版本 sdk](https://opendocs.alipay.com/open/02np93)

此处使用的 node.js sdk

[sdk 官方文档](https://github.com/alipay/alipay-sdk-nodejs-all)

初始化 sdk，并使用沙箱环境，例如:

```js
// 初始化sdk
// 此处用的沙箱环境
const sandbox = new AlipaySdk({
    appId: 'xxxxxxxxxxxx',
    privateKey: sk,
    alipayPublicKey: alipayPk,
    // 沙箱和正式网关不同
    gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do'
});
```

创建支付接口后 服务器搭建就完成了，具体内容参考 `server`

### uni-app 开发

参考 `client/pages/order-plus/order-plus.vue`

其中值得注意的是，若使用手机网页支付，在浏览器上会自动唤起正式版支付宝APP而不是沙箱APP。为了测试成功，需要在 uni-app 中使用 web-view 内嵌页面实现手机网页支付


## 微信支付

由于需要各种企业证书，所以无法个人开发