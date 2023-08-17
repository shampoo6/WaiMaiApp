<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
  onLoad(option) {
    console.log(option.url)
    console.log(unescape(option.url));
    // 使用 webview 跳转支付宝页面
    this.src = unescape(option.url)
  },
  data() {
    return {
      src: ''
    }
  },
  methods: {}
}
</script>

<style>

</style>