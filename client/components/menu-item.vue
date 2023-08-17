<template>
	<view class="menu">
		<!-- 图片 -->
		<view class="img">
			<view class="before">
				<image :lazy-load="true" src="../static/demo.jpg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="info">
			<view class="title">【新人福利】员外力荐！皮蛋瘦肉粥</view>
			<!-- 标签行 -->
			<view class="tags">
				<uni-tag text="标签" type="warning" size="mini" :custom-style="tagStyle" />
				<uni-tag text="这个标签很长" type="warning" size="mini" :custom-style="tagStyle" />
			</view>
			<view class="sale-count">
				<text class="count">月售100+</text>
				<text>好评度91%</text>
			</view>
			<!-- 商家 标签行 -->
			<view class="tags">
				<uni-tag :inverted="true" text="标签" type="warning" size="mini" :custom-style="merchantTags" />
				<uni-tag :inverted="true" text="这个标签很长" type="warning" size="mini" :custom-style="merchantTags" />
			</view>
			<!-- 价格 -->
			<view class="price-row">
				<text class="price">￥<text class="yuan">8</text>.9</text>&nbsp;
				<text class="discard">￥9.9</text>
				<view class="plus">+</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "menu-item",
		data() {
			return {
				tagStyle: 'border-radius: 10rpx; font-size: 16rpx; padding: 4rpx 4rpx 2rpx 4rpx; background-color: #fef8e0; border-color: #fef8e0; color: #e7a14b;',
				merchantTags: 'border-radius: 10rpx; font-size: 16rpx; padding: 4rpx 4rpx 2rpx 4rpx; background-color: #fff; border-color: #fe4e46; color: #fe4e46;'
			};
		},
		methods: {
			getHeight() {
				return new Promise(resolve=>{
					const query = uni.createSelectorQuery().in(this);
					query.select('.menu').boundingClientRect(data => {
						resolve(data.height)
					}).exec();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	// 菜单
	// .menu {
	// 	display: flex;

	// 	.img {
	// 		flex-grow: 0.382;

	// 		.before {
	// 			padding-top: 100%;
	// 			position: relative;

	// 			image {
	// 				width: 100%;
	// 				height: 100%;
	// 				position: absolute;
	// 				top: 0;
	// 				left: 0;
	// 				border-radius: 16rpx;
	// 			}
	// 		}
	// 	}

	// 	.info {
	// 		width: 0;
	// 		flex-grow: 0.618;
	// 		display: flex;
	// 		flex-direction: column;
	// 		gap: 4rpx;
	// 		padding-left: 16rpx;
	// 		font-size: 20rpx;

	// 		.title {
	// 			font-weight: bolder;
	// 			font-size: 32rpx;
	// 		}

	// 		.tags {
	// 			display: flex;
	// 			gap: 8rpx;

	// 			align-items: flex-start;
	// 			flex-wrap: wrap;
	// 		}

	// 		.sale-count {
	// 			color: $uni-secondary-color;

	// 			.count {
	// 				margin-right: 20rpx;
	// 			}
	// 		}

	// 		.price-row {
	// 			display: flex;
	// 			align-items: baseline;

	// 			.price {
	// 				color: #fd5632;
	// 				font-weight: bolder;

	// 				.yuan {
	// 					font-size: 40rpx;
	// 				}
	// 			}

	// 			.discard {
	// 				color: $uni-secondary-color;
	// 				text-decoration: line-through;
	// 			}

	// 			.plus {
	// 				width: 40rpx;
	// 				height: 40rpx;
	// 				border-radius: 50%;
	// 				background-color: #fdde01;
	// 				display: flex;
	// 				align-items: center;
	// 				justify-content: center;
	// 				align-self: center;
	// 				font-weight: bolder;
	// 				margin-left: auto;
	// 				font-size: 32rpx;
	// 			}
	// 		}
	// 	}
	// }
</style>