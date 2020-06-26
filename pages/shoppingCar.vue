<template>
	<view id="container" class="font">
		<navigationBar :navigationBarText="navigationBarText" :iconfont_code="iconfont_code"/>
		<view :style="{'min-height': min_height+'rpx'}" />
		<view class="split-line" />
		<view class="navbar">
			<view v-for="(item,index) in topText" class="navbar-item" :key="index" @click="selectNavItem(index)">
				<text class="content" :class="{'selected':selectIndex === index}">{{item}}</text>
			</view>
		</view>
		<view class="name">
			<text class="store-name">{{storeName}}</text>
			<text class="edit-name" @click="edit()">{{editName}}</text>
		</view>
		<view class="goods-item" v-for="(item,index) in dataList" :key="index">			
			<view :data-index="index" class="order-item" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="{ right: item.right + 'rpx' }">
				<image :src="selectIcon[Number(item.selected)]" class="select-icon" @click="select(index)"></image>
				<view class="goods-content">
					<image :src="item.imgList" class="goods-img" />
					<text class="goods-text">{{item.content}}</text>
					<view class="type">
						<text class="goods-type-text">{{item.type}}</text>
						<image src="../static/img/shoppingCar/liebiaogengduo.png" class="type-slect-img"></image>
					</view>
					<text class="goods-price">￥{{item.price}}</text>
					<view class="goods-count">
						<view class="operator" @click="add(index)"><image src="../static/img/shoppingCar/jia.png" class="operator-add-img"/></view>
						<view class="count">{{item.count}}</view>
						<view class="operator" @click="minus(index)"><image src="../static/img/shoppingCar/jian.png" class="operator-minus-img"/></view>
					</view>
				</view>
				<view class="split-line inner"/>  
				<view class="remove" @click="delItem(index)">删除</view>
            </view>
		</view>
		<view style="min-height: 105rpx;" />
		<view class="bottom">
			<image :src="selectIcon[Number(selectall)]" class="bottom-left select-icon select-all-icon" @click="selectAll()"></image>
			<view class="bottom-left select-all-text" >全选</view>
			<view class="bottom-left sum">合计：<text class="money">￥{{total}}</text></view>
			<view class="calc" v-if="editName==='编辑'">结算({{count}})</view>
			<view class="calc delete" @click="del" v-else>删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				min_height: 0,
				delBtnWidth: 100,
				// iconfont_code: '&#xe743;',
				navigationBarText: '购物车',
				topText: ["点单","购物"],
				selectIndex: 0,
				storeName: "富安娜自营店",
				editName: "编辑",
				selectIcon: [],
				dataList: [
					{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉四件套",
						price: 799.00,
						imgList: "../static/img/shoppingCar/car_1.png",
						count: 1,
						totalPrice: 799,
						selected: false,
						right: 0,
					},{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉四件套",
						price: 799.00,
						imgList: "../static/img/shoppingCar/car_2.png",
						count: 1,
						totalPrice: 799,
						selected: false,
						right: 0,
					},{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉四件套",
						price: 799.00,
						imgList: "../static/img/shoppingCar/car_1.png",
						count: 1,
						totalPrice: 799,
						selected: false,
						right: 0,
					},{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉四件套",
						price: 799.00,
						imgList: "../static/img/shoppingCar/car_1.png",
						count: 1,
						totalPrice: 799,
						selected: false,
						right: 0,
					},{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉四件套",
						price: 799.00,
						imgList: "../static/img/shoppingCar/car_1.png",
						count: 1,
						totalPrice: 799,
						selected: false,
						right: 0,
					},
					{
						content: "富安娜 纯棉提花四件套 月光森林/月 光",
						type: "纯棉三件套",
						price: 699.00,
						imgList: "../static/img/shoppingCar/car_2.png",
						count: 1,
						totalPrice: 699,
						selected: false,
						right: 0,
					}
				],
				total: 0,
				count: 0,
				selectall: false,
			} 
		},
		onLoad:function(){
			this.selectIcon.push("../static/img/shoppingCar/weixuanzhong.png");
			this.selectIcon.push("../static/img/shoppingCar/xuanzhong.png");
			this.min_height = this.$children[0].navHeight;
		},
		methods: {
			drawStart: function(e) {
			    // console.log("drawStart");
			    var touch = e.touches[0];
			    for (var index in this.dataList) {
			        this.dataList[index].right = 0;
			    }
			    this.startX = touch.clientX;
			},
			drawMove: function(e) {
			    var touch = e.touches[0];
			    var item = this.dataList[e.currentTarget.dataset.index];
			    var disX = this.startX - touch.clientX;
				
			    if (disX >= 20) {
			        if (disX > this.delBtnWidth) {
			            disX = this.delBtnWidth;
			        }
			        this.dataList[e.currentTarget.dataset.index].right = disX;
			    } else {
			        this.dataList[e.currentTarget.dataset.index].right = 0;
			    }
			},
			drawEnd: function(e) {
			    var item = this.dataList[e.currentTarget.dataset.index];
			    if (item.right >= this.delBtnWidth / 2) {
			        this.dataList[e.currentTarget.dataset.index].right = this.delBtnWidth;
			    } else {
			        this.dataList[e.currentTarget.dataset.index].right = 0;
			    }
			},
			delItem: function(index) {
			    console.log(index);
				if(this.dataList[index].selected) {
					this.total -= this.dataList[index].totalPrice;
					this.count--;
				}
				this.dataList.splice(index,1);
			},
			selectNavItem: function(index) {
				this.selectIndex = index;
			},
			add: function(index) {
				this.dataList[index].count = this.dataList[index].count+1;	
				this.dataList[index].totalPrice = this.dataList[index].count * this.dataList[index].price
				if(this.dataList[index].selected) {
					this.total += this.dataList[index].price;
				}
			},
			minus: function(index) {
				if(this.dataList[index].count !== 1) {
					this.dataList[index].totalPrice = this.dataList[index].count * this.dataList[index].price
					this.dataList[index].count = this.dataList[index].count-1;
					if(this.dataList[index].selected) {
						this.total -= this.dataList[index].price;
					}
				}
			},
			select: function(index) {
				this.dataList[index].selected = !this.dataList[index].selected;
				this.dataList[index].totalPrice = this.dataList[index].count * this.dataList[index].price
				if(this.dataList[index].selected) {
					this.total += this.dataList[index].totalPrice;
					this.count++;
				} else {
					this.total -= this.dataList[index].totalPrice;
					this.count--;
				}
				this.count===this.dataList.length?this.selectall=true:this.selectall=false;
			},
			selectAll: function() {
				let sum = 0;
				this.selectall = !this.selectall;
				this.selectall?this.count = this.dataList.length:this.count=0;
				if(this.selectall) {
					for(let i=0;i<this.dataList.length;i++) {
						this.dataList[i].selected = true;
						sum += this.dataList[i].totalPrice;
					}	
				} else {
					for(let i=0;i<this.dataList.length;i++) {
						this.dataList[i].selected = false;
						sum = 0;
					}
				}		
				this.total = sum;
			},
			edit: function() {
				this.editName==="编辑"?this.editName="完成":this.editName="编辑";
			},
			del: function() {
				for(let i=0;i<this.dataList.length;i++) {
					if(this.dataList[i].selected) {
						this.total -= this.dataList[i].totalPrice;
						this.dataList.splice(i,1);
						i--;
						this.count--;
					}
				}
			}
		}
	}
</script>
	
<style>
	#container { 
		background-color: #FAFAFA;
		width: 100%;
	}
	.font {
		font-family: PingFang-SC-Bold,PingFang-SC;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(40,40,40,1);
		letter-spacing: 2rpx;
	}
	.split-line {
		z-index: 2;
		width:750rpx;
		height:3rpx;
		background:rgba(242,242,242,1);
	}
	.inner {
		position: absolute;
		width: 690rpx;
		top: 234rpx;
		margin-left: 34rpx;
	}
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
	.navbar {
		display: flex;
		height: 90rpx;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #FFFFFF;
	}
	.navbar-item {
		width: 50%;
		text-align: center;
		margin-top: -7rpx;
		font-family: PingFang-SC-Bold,PingFang-SC;
		color: rgba(152,152,152,1);
	}
	.content {
		font-size: 30rpx;
		font-weight: bold;
		line-height: 42rpx;
		color:rgba(152,152,152,1);
	}
	.selected {
		font-weight: bold;
		font-size: 30rpx;
		padding: 10rpx;
		border-bottom: solid 4rpx #000000;
		color:rgba(40,40,40,1);
	}
	
	.name {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.store-name {
		margin-top: 20rpx;
		margin-left: 30rpx;
		padding: 20rpx auto 20rpx 30rpx;
	}
	.edit-name {
		margin-right: 30rpx;
		float: right;
		color: rgba(0,0,0,1);
	}
	.goods-item {
		position: relative;
		width: 750rpx;
		height: 234rpx;
		padding: 33rpx auto 21rpx;
		background: rgba(255,255,255,1);
	}
	.select-icon{
		position: absolute;
		top: 105rpx;
		width: 34rpx;
		height: 34rpx;
		margin-left: 30rpx;
		margin-right: 20rpx;
	}
	.order-item {
	    position: relative;
	}
	.goods-content {
		position: relative;
		float: right;	
		width: 666rpx;
		height: 180rpx;
		margin: 33rpx auto 21rpx 84rpx;
	}
	.order-item {
	    width: 100%;
	    display: flex;
	    position: relative;
	}
	.remove {
		width: 100rpx;
		height: 100%;
		background-color: red;
		color: white;
		position: absolute;
		top: 0;
		right: -100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
	.goods-img {
		width: 180rpx;
		height: 180rpx;
	}
	.goods-text {
		float: right;
		width: 421rpx;
		line-height: 37rpx;
		margin: auto 45rpx auto 20rpx;
	}
	.type {	
		position: absolute;
		height: 40rpx;
		top: 84rpx;
		left: 200rpx;
		background:rgba(242,242,242,1);
		border-radius:5px;
	}
	.goods-type-text {
		height: 33rpx;
		font-size: 24rpx;
		color:rgba(104,104,104,1);
		line-height: 33rpx;
		margin-left: 10rpx;
	}
	.type-slect-img {
		width: 13rpx;
		height: 7rpx;
		margin-left: 11rpx;
		margin-right: 10rpx;
	}
	.goods-price {
		position: absolute;
		top: 134rpx;
		left: 200rpx;
		font-size: 28rpx;
		font-weight: bold;
		line-height: 40rpx;
	}
	.goods-count {
		position: absolute;
		font-size: 24rpx;
		width: 161rpx;
		height: 40rpx;
		left: 482rpx;
		top: 131rpx;
		border: 1px solid rgba(195,195,195,1);
	}
	.operator {
		width: 49rpx;
		height: 39rpx;
		float: left;
	}
	.operator-add-img {
		width: 17rpx;
		height: 17rpx;
		margin: 10rpx 17rpx 12rpx;
	}
	.operator-minus-img {
		width: 17rpx;
		height: 2rpx;
		margin: 23rpx 17rpx 19rpx;
	}
	.count {
		width: 59rpx;
		height: 40rpx;
		float: left;
		display: flex;
		justify-content: center;
		align-items: center;
		color:rgba(104,104,104,1);
		border-left: 1px solid rgba(195,195,195,1);
		border-right: 1px solid rgba(195,195,195,1);
	}
	
	.bottom {
		position: fixed;
		width: 750rpx;
		height: 98rpx;
		bottom: 0;
		background:rgba(255,255,255,1);
		z-index: 9999;
	}
	.bottom-left {
		position:  absolute;
		top: 0;
		bottom: 0;
		left: 30rpx;
		margin: auto;
		line-height:98rpx;
	}
	.select-all-icon{
		left: 30rpx;
	}
	.select-all-text {
		float: left;
		font-size: 28rpx;
		margin-left: 54rpx;
		color:rgba(104,104,104,1);
	}
	.sum {
		float: left;
		margin-left: 259rpx;
		font-size:28rpx;
	}
	.money {
		font-size: 30rpx;
		font-weight:bold;
		line-height:42rpx;
		margin-left: 10rpx;
	}
	.calc {
		float: right;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 220rpx;
		height: 98rpx;
		background:rgba(0,0,0,1);
		font-size: 30rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height:42rpx;
	}
	.delete {
		background: #ff3300;
	}
</style>
