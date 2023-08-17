// sdk 官网: https://github.com/alipay/alipay-sdk-nodejs-all

const AlipaySdk = require('alipay-sdk').default;
const fs = require('fs')
const path = require("path");

let sk = fs.readFileSync(path.resolve(__dirname, './keys/sandbox/sk')).toString()
let alipayPk = fs.readFileSync(path.resolve(__dirname, './keys/alipayPk')).toString()

// 初始化sdk
// 此处用的沙箱环境
const sandbox = new AlipaySdk({
    appId: 'xxxxxxxxxxxxxxxx',
    privateKey: sk,
    alipayPublicKey: alipayPk,
    // 沙箱和正式网关不同
    gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do'
});

sk = fs.readFileSync(path.resolve(__dirname, './keys/sk')).toString()

// 此处为正式环境
const sdk = new AlipaySdk({
    appId: 'xxxxxxxxxxxxxxxx',
    privateKey: sk,
    alipayPublicKey: alipayPk,
    // 正式网关尚未设置
    // gateway: ''
});

module.exports = {
    // 模式: prod 生产  dev 开发
    mode: 'dev',
    sdk,
    sandbox,
    getSdk() {
        return this.mode === 'prod' ? this.sdk :
            this.mode === 'dev' ? this.sandbox : null
    }
};