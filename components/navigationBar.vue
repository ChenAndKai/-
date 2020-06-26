<template name="navigation">
	<view class="navigation" >
		<view class="navation-bar" :style="'height:' +  navation_bar.height + 'rpx;' + 'padding-top:' + navation_bar.top + 
		'rpx;padding-bottom:' + navation_bar.padding_bottom + 'rpx'">
		    <view class="left" :style="'top:' + navation_bar.top + 'rpx'">
		        <view class="iconfont">&#xe743;</view>
		    </view>
		    {{navigationBarText}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'navigation',
		props: {
			iconfont_code: '',
			navigationBarText: '',
		},
		data: function() {
			return {
				navation_bar: {
					top: 0,
					height: 0,
					padding_bottom: 50,
				},					
				navHeight: 0,
			}
		},
		created:function(){
			const navation_bar = uni.getMenuButtonBoundingClientRect();
			this.navation_bar.top = navation_bar.top+45;
			this.navation_bar.height = navation_bar.height;
			this.navHeight = this.navation_bar.top + this.navation_bar.height + this.navation_bar.padding_bottom;
		},
	}
</script>

<style>
	@import url("../static/iconfont.css");
	.navigation {
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 100rpx;
		z-index: 9999;
	}
	.navation-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFF;
		font-size: 36rpx;
	}
	.left {
		float: left;
		position: absolute;
		width: max-content;
		height: max-content;
		left: 20rpx;
		margin: auto;
	}
	.iconfont {
		font-size: 60rpx;
	}
</style>
