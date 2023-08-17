<template>
	<view class="nav-bar-container" :style="{backgroundColor: bgColor}">
		<view class="placeholder" :style="{height: placeholderHeight + 'px'}"></view>
		<view class="nav-container">
			<view class="title-container">
				<view class="title">
					<slot name="title">
						<text>{{title}}</text>
					</slot>
				</view>
			</view>
			<view class="prefix">
				<slot name="prefix">
					<template v-if="typeof back === 'function'">
						<view @click="onBackClick">返回</view>
					</template>
				</slot>
			</view>
			<view class="suffix">
				<slot name="suffix"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "nav-bar-plus",
		props: {
			bgColor: {
				type: String,
				default: '#fff'
			},
			back: Function,
			title: String
		},
		data() {
			return {
				placeholderHeight: getApp().globalData.windowInfo.safeArea.top
			};
		},
		methods: {
			onBackClick() {
				console.log('click');
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-bar-container {
		.placeholder {}

		.nav-container {
			position: relative;
			display: flex;
			height: 48px;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;

			.title-container {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.title {}
			}
			
			.prefix {
				position: relative;
			}
			
			.suffix {
				position: relative;
			}
		}
	}
</style>