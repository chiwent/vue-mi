<template>
	<div class="container">
		<sticky-header>
			<p slot="title" class="title">
				{{ title }}
			</p>
		</sticky-header>
		<div class="tab-wrap">
			<div class="tab">
				<ul>
					<li v-for="(item, index) in tabList" :key="index" class="tab-li"  @click="curIndex = index">
						<span :class="{active: curIndex === index}">{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="info">
			<div class="info-img">
				<img :src="require('../assets/img/empty.png')" alt="empty">
			</div>
			<p class="info-text">
				您没有未使用的优惠券
			</p>
		</div>
		<sticky-footer></sticky-footer>
	</div>
</template>
<script>
	import StickyHeader from '../components/StickyHeader'
	import StickyFooter from '../components/StickyFooter'
	export default {
		name: 'Coupon',
		components: {
			StickyHeader,
			StickyFooter
		},
		data() {
			return {
				title: '优惠券列表',
				tabList: ['未使用', '已使用/已过期'],
				curIndex: 0
			}
		},
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;
	}
	.title {
		margin: 0 auto;
	}
	.tab-wrap {
		padding: 70px 0;
		.tab {
			font-size: 20px;
			border-bottom: 1px solid #eee;
			margin-top: 15px;
			ul {
				display: flex;
				padding: 0;
				.tab-li {
					flex: 1 1 auto;
					text-align: center;
					font-size: 25px;
					.active {
						color: #ff3100;
						border-bottom: 2px solid #ff3100;
						padding: 8px 0;
					}
				}
			}
		}
	}
	.info {
		color: #999;
		text-align: center;
		margin: 30px 45px 0;
		.info-img {
			margin: 0 auto;
			width: 50%;
			height: 50%;
			img {
				width: 70%;
				height: 70%;
			}
		}
		.info-text {
			text-align: center;
		}
	}
</style>