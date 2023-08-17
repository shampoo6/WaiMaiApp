<script>
export default {
  onLaunch: function () {
    console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
    console.log('App Launch')
    this.globalData.windowInfo = uni.getWindowInfo()

    if (uni.getSystemInfoSync().platform === "android") {
      // 开启支付宝沙箱环境
      const EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");
      EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
      console.log(EnvUtils)
      console.log(EnvUtils.EnvEnum.SANDBOX)
      console.log(EnvUtils.isSandBox())
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
//@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
@import '@/static/style.css';

// 设置整个项目的背景色
page {
  background-color: #f5f5f5;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
</style>
