<template>
  <view class="flex" @tap="$emit('tap')">
    <view class="grow">
      <slot></slot>
    </view>
    <view class="self-center pl-2">&gt;</view>
  </view>
</template>

<script>
export default {
  emits: ['tap'],
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>