<template>
	<view id="container" class="font">
		<image class="bg" src="../static/img/myInfo/bg.png" />
		<navigationBar :navigationBarText="navigationBarText" :iconfont_code="iconfont_code"/>
		<view :style="{'min-height': min_height+'rpx'}"  />
		<view class="content">
			<view class="userInfo">
				<view class='header-login' v-if="login">
				    <view class="header">
				    	<open-data class='head-img' type="userAvatarUrl" ></open-data>
				    </view>
					<open-data type="userNickName" class="nickname"></open-data>
					<text class="tel">137****9898</text>
				</view>
				<view class="" v-else>
					<view class="head-img"></view>
					<button class="sys-btn" open-type="getUserInfo" @getuserinfo="appLoginWx">登录</button>
				</view>
				
				
			</view>
			<view class="qrcode">
				<image src="../static/img/myInfo/qrcode.png" class="qrcode-img" mode=""></image>
				<text class="qrcode_text">会员码</text>
			</view>
			<view class="vip ">
				<image src="../static/img/myInfo/cardtop.png" style="width: 670rpx;height: 120rpx;"></image>
				<image src="../static/img/myInfo/membiden.png" class="vip-top-img" mode=""></image>
				<text class="vip-top-text">TIMING会员</text>
				<view class="vip-top-button">
					<text style="margin-top: 12rpx;display: inline-block;">我的权益</text>
					<image src="../static/img/myInfo/right.png" class="right"></image>
				</view>
				<view class="vip-bottm">
					<image class="vip-bottm-img"  src="../static/img/myInfo/cardbottom.png" mode="aspectFit"/>	
					<view class="vip-bottom-left">
						<text class="vip-bottom-rewardpoint">{{rewardPoints}}</text>
						<image class="vip-bottom-speedimg" src="../static/img/myInfo/speed.png" mode=""></image>
						<text class="vip-bottm-speedtext">{{speed}}倍</text>
						<text class="vip-bottom-title">当前积分</text>
					</view>
					<view class="vip-bottom-verticalline" />
					<view class="vip-bottom-right">
						<text class="vip-bottom-title vip-bottm-coupon">{{coupon}}</text>
						<text class="vip-bottom-title">优惠券中心</text>
					</view>
				</view>
			</view>
			<image src="../static/img/myInfo/ad.png" class="ad" />
			<text class="server-text">我的服务</text>
			<view class="server">
				<view class="serverItem" v-for="(item,index) in serverList" :key="index" :class="(index + 1) % 4===0?'serverItem-noright':''">
					<image class="serverItem-img" :src="item.imgPath" mode=""></image>
					<text class="serverItem-text">{{item.text}}</text>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				// iconfont_code: '&#xe743;',
				navigationBarText: '个人中心',
				min_height: 0,
				serverList: [
					{
						text: '资料设置',
						imgPath: '../static/img/myInfo/selfinfo.png'
					},
					{
						text: '积分商城',
						imgPath: '../static/img/myInfo/shop.png'
					},
					{
						text: '我的订单',
						imgPath: '../static/img/myInfo/order.png'
					},
					{
						text: '消费记录',
						imgPath: '../static/img/myInfo/record.png'
					},
					{
						text: '涨积分',
						imgPath: '../static/img/myInfo/zhangjifen.png'
					},
					{
						text: '帮助',
						imgPath: '../static/img/myInfo/help.png'
					}
					
				],
				rewardPoints: "12K",
				speed: 25,
				coupon: 5,
				// userImg: '../static/img/myInfo/touxiang.png',
				nickName: '',
				login: false,
			}
		},
		onLoad:function(){	
			let _this = this;
			this.min_height = this.$children[0].navHeight;
			//#ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.userInfo']) {
						//这里调用授权
						_this.login = false;
					} else {
						//用户已经授权过了
						_this.login = true;
					}
				}
		   })
		   //#endif
		},
		methods: {
			appLoginWx(){
			// #ifdef MP-WEIXIN
				let _this = this; 
				uni.login({  
					success: (res) => {  
						console.log("login", JSON.stringify(res));  
					}  
				}) 
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res) => {
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => {//这里请求接口
											// _this.userImg = info.userInfo.avatarUrl;
											// _this.nickName = info.userInfo.nickName;
											_this.login = true;
										},
										fail: () => {
											uni.showToast({title:"微信登录授权失败",icon:"none"});
										}
									})
								},
								fail: () => {
									uni.showToast({title:"微信登录授权失败",icon:"none"});
								}
							})	
						}
						else{
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon:"none"
							});
						}
					}
				});
				//#endif
			}
		}
	}
</script>

<style>
	#container {
	}
	.font {
		font-family: PingFang-SC-Bold,PingFang-SC;
		font-weight: 500;
		font-size: 26rpx;
		color:rgba(40,40,40,1);
		
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
	.content {
		position: relative;
	}
	.bg {
		position:fixed;
		top: 0;
		left: 0;
		width:100%;
		height:100%;
		z-index:-10;
		zoom: 1;
		background-size: cover;
		background-position: center 0;	
	}
	.userInfo {
		position: absolute; 
		left: 40rpx;
		top: 70rpx;
		width: 580rpx;
		height: 100rpx;
	}
	.header {
	  border-radius: 50%;
	  overflow: hidden;
	  width: 100rpx;
	  height: 100rpx;
	  position: relative;
	}
	
	.head-img {
		background: #A9A9A9;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.tel {
		font-size: 26rpx;
		color: rgba(152,152,152,1);
		line-height: 37rpx;
		position: absolute;
		top: 57rpx;
		left: 120rpx;
	}
	.nickname {
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(40,40,40,1);
		line-height: 40rpx;
		position: absolute;
		left: 130rpx;
		top: 7rpx;
	}
	.sys-btn {
		font-size: 28rpx;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 120rpx;
	}
	.qrcode {
		position: absolute;
		width: 80rpx;
		height: 78rpx;
		top: 81rpx;
		left: 630rpx;
	}
	.qrcode-img {
		width: 40rpx;
		height: 40rpx;
		margin-left: 16rpx;
	}
	.qrcode_text {
		display: block;
		margin-top: 5rpx;
		font-size: 24rpx;
		color: rgba(0,0,0,1);
	}
	.vip {
		position: absolute;
		top: 210rpx;
		left: 40rpx;
	}
	.vip-top-img {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		top: 30rpx;
		left: 30rpx;
	}
	.vip-top-text {
		position: absolute;
		font-weight: bold;
		color: rgba(244,225,169,1);
		line-height: 42rpx;
		font-size: 30rpx;
		top: 39rpx;
		left: 110rpx;
	}
	.vip-top-button {
		position: absolute;
		top: 30rpx;
		left: 480rpx;
		width: 160rpx;
		height: 60rpx;
		background: rgba(244,225,169,1);
		border-radius: 30rpx;	
		color: rgba(0,0,0,1);
		line-height: 37rpx;
		text-align: center;
	}
	.vip-top-button .right {
		width: 9rpx;
		height: 15rpx;
		margin-left: 4rpx;
	}
	.vip-bottm {
		margin-top: -8rpx;
		text-align: center;
		position: relative;
		color: rgba(0,0,0,1);
		font-size: 24rpx;
		letter-spacing: 1rpx
	}
	.vip-bottm-img {
		width: 670rpx;
		height: 160rpx;
	}
	.vip-bottom-left {
		position: absolute;
		width: 50%;
		left: 0;
		top: 0;
	}
	.vip-bottom-right {
		position: absolute;
		top: 0;
		right: 0;
		width: 50%;
	}
	.vip-bottom-rewardpoint {
		display: inline-block;
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(0,0,0,1);
		line-height: 50rpx;
		margin-top: 34rpx;
	}
	.vip-bottom-speedimg {
		margin-left: 16rpx;
		margin-top: 43rpx;
		width: 22rpx;
		height: 31rpx;
	}
	.vip-bottm-speedtext {
		font-weight: bold;
		color: rgba(149,111,1,1);
		line-height: 37rpx;
		position: absolute;
		left: 223rpx;
		top: 41rpx;
	}
	.vip-bottom-title {
		display: block;
		margin-top: 10rpx;
		margin-left: -30rpx;
	}
	.vip-bottom-verticalline {
		position: absolute;
		width: 2rpx;
		height: 80rpx;
		left: 334rpx;
		top: 40rpx;
		background: rgba(226, 218, 185, 1);
	}
	.vip-bottm-coupon {
		display: inline-block;
		font-size: 36rpx;
		font-weight:bold;
		line-height: 50rpx;
		margin-top: 34rpx;
	}
	.ad {
		position: absolute;
		width: 670rpx;
		height: 160rpx;
		top: 520rpx;
		left: 40rpx;
	}
	.server-text {
		font-size: 28rpx;
		font-weight: 600;
		line-height: 40rpx;
		position: absolute;
		top: 700rpx;
		left: 60rpx;
		color: rgba(40,40,40,1);
	}
	.server {
		position: absolute;
		width: 670rpx;
		top: 700rpx;
		left: 40rpx;
		margin-top: 71rpx;
		margin-left: 33rpx;
	}
	.serverItem {
		width: 96rpx;
		height: 113rpx;
		margin-right: 79rpx;
		margin-bottom: 40rpx;
		display: inline-block;
	}
	.serverItem-noright {
		width: 96rpx;
		height: 113rpx;
		margin-right: 0;
	}
	.serverItem-img {
		height: 70rpx;
		width: 70rpx;
		margin-left: 13rpx;
	}
	.serverItem-text {
		font-size:24rpx;
		line-height:33rpx;
		display: block;
		text-align: center;
	}
</style>
