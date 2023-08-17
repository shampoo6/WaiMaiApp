<template>
  <view class="absolute top-0 w-full" :style="containerStyle">
    <tw-nav-bar></tw-nav-bar>
    <scroll-view :scroll-y="true" class="absolute" :style="scrollViewStyle">
      <view class="px-3 space-y-1.5">
        <card>
          <view class="space-y-1">
            <card-tapable>
              <text class="text-lg font-bold break-all line-clamp-2">
                <tag class="relative top-[-3px] mr-1">公司</tag>
                <text class="tracking-wider">重庆总部城A区-4号楼 重庆市渝中区虎踞路62号12-1</text>
              </text>
            </card-tapable>
            <view class="text-sm text-gray-400">陆宪甫&nbsp;先生&nbsp;&nbsp;17783683002</view>
            <view class="text-xs text-green-600">点餐请适量，环保又健康</view>
          </view>
          <view class="pt-5 space-y-1">
            <card-tapable class="text-sm">
              <view class="flex w-full">
                <view class="font-bold">立即送出</view>
                <view class="ml-auto text-orange-500">15:46-16:01送达</view>
              </view>
            </card-tapable>
            <view class="text-xs text-orange-500">由商家自行配送，实际送达时间可联系商家确认</view>
          </view>
        </card>
        <card>
          <card-tapable>
            <view class="h-full flex items-center text-sm">
              <view class="font-bold">支付方式</view>
              <view class="ml-auto flex items-center">
                <view class="text-xs">送满20减
                  <text class="text-orange-500">5元</text>
                  外卖券
                </view>
                <view class="ml-2">急速支付</view>
              </view>
            </view>
          </card-tapable>
        </card>
        <card>
          <view class="space-y-1">
            <button class="btn" @tap="alipay">支付宝支付</button>
            <input class="py-3 h-[64px]" v-model="alipayOrderNo" type="text" placeholder="请输入商家订单号">
            <button class="btn" @tap="alipayQuery">支付宝查询订单</button>
            <button class="btn" @tap="alipayRefund">支付宝卖家退款</button>
            <button class="btn" @tap="alipayWapPay">支付宝手机网页支付</button>
          </view>
        </card>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import config from '../../config'

export default {
  data() {
    const wi = getApp().globalData.windowInfo
    return {
      containerStyle: {
        backgroundImage: 'linear-gradient(to bottom, #fde047, #f5f5f5 330px)',
        bottom: wi.safeAreaInsets.bottom + 'px'
      },
      scrollViewStyle: {
        top: wi.safeAreaInsets.top + 48 + 'px',
        bottom: wi.safeAreaInsets.bottom + 'px'
      },
      alipayOrderNo: ''
    }
  },
  methods: {
    async alipay() {
      const res = await uni.request({
        url: config.baseUrl + '/alipayOrderInfo',
        method: 'post',
      })
      console.log(res)

      const orderInfo = res.data.orderInfo;  //从服务器获取的订单
      uni.getProvider({
        service: 'payment',
        success: function (res) {
          console.log(res.provider)
          if (~res.provider.indexOf('alipay')) {
            uni.requestPayment({
              "provider": "alipay",   //固定值为"alipay"
              "orderInfo": orderInfo, //此处为服务器返回的订单信息字符串
              success: function (res) {
                console.log(res)
                var rawdata = JSON.parse(res.rawdata);
                console.log("支付成功");
              },
              fail: function (err) {
                console.log('支付失败:' + JSON.stringify(err));
              }
            });
          }
        }
      });
    },
    async alipayQuery() {
      const res = await uni.request({
        url: config.baseUrl + '/alipayOrderQuery',
        method: 'post',
        data: {orderNo: this.alipayOrderNo}
      })
      console.log(res)
      uni.showModal({
        title: '查询结果',
        content: JSON.stringify(res.data)
      })
    },
    async alipayRefund() {
      const res = await uni.request({
        url: config.baseUrl + '/alipayRefund',
        method: 'post',
        data: {orderNo: this.alipayOrderNo}
      })
      console.log(res)
      uni.showModal({
        title: '退款结果',
        content: JSON.stringify(res.data)
      })
    },
    // 手机网页支付
    async alipayWapPay() {
      // 请求服务器获取订单参数
      const res = await uni.request({
        url: config.baseUrl + '/wapPay',
        method: 'post'
      })
      console.log(res.data.result)
      // 使用沙箱网关拼接请求url
      let url = 'https://openapi-sandbox.dl.alipaydev.com/gateway.do?' + res.data.result
      url = escape(url)
      console.log(url);
      uni.navigateTo({
        url: '/pages/wv/wv?url=' + url
      })
    }
  }
}
</script>

<style>

</style>
