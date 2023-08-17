<template>
	<view class="container">
		<nav-bar></nav-bar>
		<view class="content" :style="contentStyle">
			<scroll-view class="category-bar" :scroll-y="true" :scroll-top="categoryScrollTop"
				@scroll="onCategoryScroll">
				<!-- <view class="box" v-for="(_, i) in 20">{{i}}</view> -->
				<view @click="switchCategory(i)" :class="`category-item ${c.active? 'active': ''}`"
					v-for="(c, i) in categorys" :key="c.name">
					<view class="before"></view>
					<text class="content">{{c.name}}</text>
				</view>
				<view style="height: 400rpx"></view>
			</scroll-view>
			<view class="menu-bar">
				<scroll-view :scroll-y="true" :scroll-into-view="`_${currentCategory}`" @scroll="onMenuScroll">
					<view class="menu-scroll-container">
						<view v-for="(c, i) in categorys" :key="i">
							<view :id="`_${i}`" class="category-title">{{c.name}}</view>
							<view class="menu-container">
								<menu-item v-for="(_, j) in c.menus" :key="j"></menu-item>
							</view>
						</view>

						<!-- 到底了 -->
						<view class="bottom-placeholder">
							已经到底啦
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const windowInfo = getApp().globalData.windowInfo
			const faceCategory = []
			for (var i = 0; i < 40; i++) {
				faceCategory.push({
					name: '测试分类' + i,
					active: false,
					menus: (() => {
						let result = []
						const length = 1 + Math.round(Math.random() * 3)
						for (var i = 0; i < length; i++) {
							result.push({})
						}
						return result
					})()
				})
			}
			faceCategory[0].active = true
			return {
				navHeight: 48,
				navHeightAndSafeTop: 48 + windowInfo.safeArea.top,
				contentHight: windowInfo.screenHeight - 48 - 50 - windowInfo.safeArea.top - (windowInfo.screenHeight -
					windowInfo.safeArea.bottom),
				contentStyle: {
					height: windowInfo.screenHeight - 48 - 50 - windowInfo.safeArea.top - (windowInfo.screenHeight -
						windowInfo.safeArea.bottom) + 'px'
				},
				currentCategory: 0,
				categorys: faceCategory,
				// 分类标题对应的offsetTop集合
				categoryOffsetTops: [],
				// 分类滚动条的滚动顶部值
				categoryScrollTop: 0,
				// 缓存分类滚动条的参数
				categoryScrollData: {
					deltaX: 0,
					deltaY: 0,
					scrollHeight: 0,
					scrollLeft: 0,
					scrollTop: 0,
					scrollWidth: 0
				},
				// 偏离多少个分类按钮的高度时 触发固定显示边界的代码
				categroyScrollOffsetCount: 4
			}
		},
		computed: {
			categoryActiveIdx() {
				if (this.categorys.length === 0) return -1
				return this.categorys.findIndex(c => c.active)
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.category-title').boundingClientRect(data => {
				this.categoryOffsetTops = data.map(item => item.top)
			}).exec();
		},
		methods: {
			switchCategory(i) {
				if (this.categoryActiveIdx !== -1)
					this.categorys[this.categoryActiveIdx].active = false
				this.currentCategory = i
				this.categorys[this.currentCategory].active = true
			},
			onCategoryScroll(ev) {
				this.categoryScrollData = ev.detail
			},
			async onMenuScroll(ev) {
				const tmp = []
				for (var i = 0; i < this.categoryOffsetTops.length; i++) {
					if (ev.detail.scrollTop >= this.categoryOffsetTops[i] - this.navHeightAndSafeTop - 3)
						tmp.push(this.categoryOffsetTops[i])
					else
						break
				}

				// 当前已激活的索引
				let activeIdx = this.categoryActiveIdx
				this.categorys[activeIdx].active = false

				// 找到需要设置成active的索引
				if (tmp.length === 0) {
					activeIdx = 0
				} else {
					const item = tmp[tmp.length - 1]
					activeIdx = this.categoryOffsetTops.findIndex(el => el === item)
				}

				this.categorys[activeIdx].active = true

				// 查找当前激活的元素
				const el = await new Promise(resolve => {
					const query = uni.createSelectorQuery().in(this)
					query.selectAll('.category-item').boundingClientRect(data => {
						resolve(data[activeIdx])
					}).exec();
				})
  
  
				if (el.top - this.navHeightAndSafeTop < this.categroyScrollOffsetCount * el.height) {
					this.categoryScrollTop = (activeIdx - this.categroyScrollOffsetCount) * el.height
				} else if (el.bottom > this.navHeightAndSafeTop + this.contentHight - ((this.categroyScrollOffsetCount) * el.height)) {
					const middleCount = Math.ceil(this.contentHight / el.height)
					const scrollTop = activeIdx * el.height
					this.categoryScrollTop = scrollTop - (middleCount - this.categroyScrollOffsetCount - 1) * el.height
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	 .container {
	 	display: flex;
	 	flex-direction: column;

	 	.content {
	 		background-color: #fff;
	 		display: flex;
	 		font-size: 28rpx;

	 		.category-bar {
	 			height: 100%;
	 			width: 170rpx;
	 			background-color: #f7f8fa;

	 			.category-item {
	 				position: relative;

	 				.before {
	 					padding-top: 61.8%;
	 					background-color: transparent;
	 				}

	 				.content {
	 					width: 100%;
	 					height: 100%;
	 					position: absolute;
	 					top: 0;
	 					left: 0;
	 					display: flex;
	 					justify-content: center;
	 					align-items: center;
	 					background-color: transparent;
	 					font-size: 22rpx;
	 					font-weight: bolder;
	 					color: #929395;
	 				}
	 			}

	 			.category-item.active {
	 				background-color: #fff;

	 				.content {
	 					color: #000;
	 				}
	 			}
	 		}

	 		.menu-bar {
	 			height: 100%;
	 			flex-grow: 1;
	 			background-color: #fff;
	 			display: flex;
	 			flex-direction: column;

	 			scroll-view {
	 				flex-grow: 1;
	 				height: 0;

	 				.menu-scroll-container {
	 					height: 100%;
	 					position: relative;
	 					padding: 0 32rpx 0 16rpx;

	 					.category-title {
	 						position: sticky;
	 						top: -2px;
	 						padding: 8rpx 0;
	 						background-color: #fff;
	 						z-index: 9999;
	 					}

	 					.menu-container {
	 						display: flex;
	 						flex-direction: column;
	 						gap: 16rpx;
	 					}

	 					.bottom-placeholder {
	 						height: 400rpx;
	 						text-align: center;
	 						color: $uni-secondary-color;
	 						margin-top: 64rpx;
	 					}
	 				}
	 			}
	 		}
	 	}
	 }
</style>