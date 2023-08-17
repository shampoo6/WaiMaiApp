<template>
  <view class="text-base">
    <view :style="{height: placeholderHeight + 'px'}"></view>
    <view class="relative flex justify-center items-center h-[48px]">
      <view class="absolute left-0 pl-3">
        <slot name="prefix">
          <text>&lt;</text>
        </slot>
      </view>
      <view>
        <slot name="title">标题</slot>
      </view>
      <view class="absolute right-0 pr-3">
        <slot name="suffix">后</slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      placeholderHeight: getApp().globalData.windowInfo.safeArea.top
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>