<template>
	<view class="nb-container">
		<view :style="placeholderStyle"></view>
		<view class="content">
			<view>菜单</view>
			<view class="right">
				<text>客服</text>
				<text>收藏</text>
				<text>...</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-bar",
		data() {
			return {
				placeholderStyle: {
					height: getApp().globalData.windowInfo.safeArea.top + 'px'
				}
			};
		}
	}
</script>

<style scoped lang="scss">
.nb-container {
	position: sticky;
	top: 0;
	z-index: 99999;
	background-color: #fff;
	
	.content {
		height: 48px;
		display: flex;
		align-items: center;
		padding: 0 16px;
		
		.right {
			margin-left: auto;
			display: flex;
			gap: 16px;
		}
	}
}
</style>