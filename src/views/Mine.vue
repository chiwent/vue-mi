<template>
	<div class="container">
		<div class="header">
			<div class="user">
				<div class="login-img">
					<img :src="require('../assets/img/login-avatar.png')" alt="login-avatar">
				</div>
				<div class="sign">登录/注册</div>
			</div>
		</div>
		<div class="my-order">
			<div class="cite">我的订单</div>
			<div class="all-order">
				<!-- todo:做嵌套路由 -->
				<!-- <router-link :to="{name: 'Order', params: {orderType}, query: {type: 7}}">
					全部订单
				</router-link> -->
				<router-link :to="{name: 'Order', params: {orderType}}" class="all	">
					全部订单
				</router-link>
				<span class="more"></span>
			</div>
		</div>
		<ul class="service">
			<li v-for="(item, index) in serviceList" :key="index" class="service-item">
				<router-link :to="{name: 'Order', params: {orderType}, query: {type: item.id}}" class="service-link">
					<!--<div class="service-row-icon">-->
						<img :src="require('../assets/img/' + item.img)" alt={item.img} class="service-icon">
					<!--</div>-->
					<span class="service-row-info">{{item.name}}</span>
				</router-link>
			</li>
		</ul>
		<ul class="row-items">
			<li v-for="(item, index) in routes" class="row-li">
				<img :src="require('../assets/img/' + item.img)" alt={item.img}>
				<router-link :to="{name: item.name, params: item.params, query: {location_type: item.query}}" class="row-link">
					{{item.info}}
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'Mine',
		data() {
			return {
				orderType: 'list',
				serviceList: [
					{
						id: 7, name: '待付款', img: 'unpay.png'
					},
					{
						id: 8, name: '待收货', img: 'receipt.png'
					},
					{
						id: 9, name: '退换修', img: 'return.png'
					}
				],
				routes: [
					{ name: 'Mpointsmall', params: '', query: '', img: 'vip.png', info: '会员中心'},
					{ name: 'MineCoupon', params: 'coupon', query: '', img: 'wallet.png', info: '我的优惠'},
					{ name: 'Services', params: '', query: '', img: 'service.png', info: '服务中心'},
					{ name: 'Maplocation', params: 'address', type: 'mihome', img: 'mihome.png', info: '小米之家'},
					{ name: 'Fcode', params: '', query: '', img: 'fcode.png', info: '小米之家'},
					{ name: 'Setting', params: '', query: '', img: 'setting.png', info: '设置'}
				]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;
		margin: 0 auto;
		padding: 0;
		background-color: rgba(150, 150, 150, .15);
		.header {
			background: url(../assets/img/login-bg.png) center 0 #f37d0f;
			background-size: auto 100%;
			padding: 10px 0;
		}
	}
	.user {
		display: flex;
		align-items: center;
		.login-img {
			margin: 0 10px 0 20px;
			width: 50px;
			height: 50px;
			overflow: hidden;
			box-sizing: border-box;
			border-radius: 100%;
			border: 3px solid hsla(0, 0%, 100%, .4);
			text-align: center;
			img {
				width: auto;
				height: 100%;
				margin: 0 auto;
				border-style: none;
			}
		}
		.sign {
			color: #fff;
			font-size: 16px;
			text-align: left;
		}
	}
	.my-order {	
		background-color: #fff;
		height: 40px;
		border-bottom: 1px solid rgba(0, 0, 0, .3);
		position: relative;
		padding-right: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.cite {
			font-size: 16px;
			padding-right: 8px;
			color: rgba(0, 0, 0, .9);
			padding-left: 8px;
		}
		.all-order {
			font-size: 14px;
			color: rgba(0, 0, 0, .9);
			display: flex;
			align-items: center;
			.all {
				outline: none;
				color: rgba(0, 0, 0, .9);
				padding-right: 8px;
				&:after {
					content: '';
					position: absolute;
					right: 10px;
					top: 50%;
					width: 10px;
					height: 10px;
					border-left: 1px solid currentColor;
					border-top: 1px solid currentColor;
					transform: translate3d(0, -50%, 0) rotate(135deg);
				}
			}
		}
	}
	.service {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20px 10px;
		background-color: #fff;
		margin: 0;
    	list-style: none;
		.service-item {
			display: flex;
			align-content: space-between;
			padding: 6px 0;
			.service-link {
				outline: 0;
				.service-icon {
					display: block;
					width: 30px;
					height: 30px;
					margin: 0 auto 6px;
				}
				.service-row-info {
					color: rgba(0, 0, 0, .9);
				}
			}
		}
	}
	.row-items {
		background-color: #fff;
		.row-li {
			position: relative;
			color: rgba(0, 0, 0, .5);
			line-height: 0;
			.row-link {
				padding-right: 15px;
				padding-left: 30px;
				height: 30px;
				&:nth-child(even) {
					border-bottom: 1px solid rgba(150, 150, 150, .15);
				}
			}
		}
	}
</style>