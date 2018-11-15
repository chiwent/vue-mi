<template>
	<div class="scroller">
	<div class="container">
		<div class="list-navbar">
			<ul class="left-bar">
				<li v-for="(item, index) in leftBar" @click="scrollTo(item)" :class="{active: activeMenu === item}">
					 <!-- <router-link :to=""><span>{{}}</span></router-link>  -->
					{{item}}
				</li>
			</ul>
		</div>
		<div class="list-wrap">
			<div class="list-rightbar">
				<div  v-for="(item, index) in rightBar" v-scrollWatch="{name : item.id, offset : 0, callback : spyDomChange}">
					<div class="title-img-wrap" v-if="item.titleImg !== void 0">
						<img :src="require('../assets/img/' + item.titleImg)" alt="item.titleImg">
					</div>
					<div class="title">
						<span class="title-info">
							{{ item.id }}
						</span>
					</div>
					<div class="category-group">
						<div class="box">
							<div class="product" v-for="(item2, index) in item.items">
								<div class="product-wrap">
									<img :src="require('../assets/img/' + item2.img)" alt={item2.img} class="product-icon">
									<p class="product-info">
										{{ item2.key }}
									</p>
								</div>
							</div>
							<p v-if="item.last" style="text-align: center; font-size: 40px; font-weight: 500;">到结尾了</p>
						</div>
					</div>
				</div>
				<!--<p style="text-align: center; font-weight: 500; font-size: 35px;">到结尾了</p>-->
			</div>
		</div>
	</div>
	<sticky-footer></sticky-footer>
	</div>
</template>
<script>
	import scrollWatch from "vue-scrollwatch"
	import StickyFooter from './StickyFooter'
	export default {
		name: 'Cate',
		components: {
			StickyFooter
		},
		data() {
			return {
				activeMenu: '',
				leftBar: ['新品', '手机', '电视', '电脑', '家电', '路由', '出行', '穿戴', '智能', '电源', '健康', '灯具', '儿童', '插线板', '音频', '箱包', '生活', '配件', '家装', '礼品', '服务', '会员卡', '米粉卡', '零售店'],
				// rightBar: ['新品', '手机', '电视', '电脑', '家电', '路由', '出行', '穿戴', '智能', '电源', '健康', '灯具', '儿童', '插线板', '音频', '箱包', '生活', '配件', '家装', '礼品', '服务', '会员卡', '米粉卡', '零售店']
				rightBar: [
					{
						id: '新品', 
						items: [
	
								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg'
					},
					{
						id: '手机', 
						items: [
	
								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg'
					},
					{
						id: '电视', 
						items: [

								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg'
					},
					{
						id: '电脑', 
						items: [

								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg'
					},
					{
						id: '家电', 
						items: [

								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg'
					},
					{
						id: '路由', 
						items: [

								{key: '小米MIX 3', img: 'icon-mix3.png'},
								{key: '小米8 青春版', img: 'icon-mi8s.png'},
								{key: '小米8 屏幕指纹板', img: 'icon-mi8plus.png'},
								{key: '小米8', img: 'icon-mi8.png'},
								{key: '小米8 SE', img: 'icon-mi8se.png'},
								{key: '小米Max 3', img: 'icon-max3.png'},

								{key: '58英寸 电视4A', img: 'icon-tv4a.jpg'},
								{key: '40英寸 电视4C', img: 'icon-tv4c.jpg'},
								{key: '43英寸 4X', img: 'icon-tv4x.jpg'},
								{key: '65"电视4旗舰版', img: 'icon-tv4.jpg'},
								{key: '65英寸 Pro 4S', img: 'icon-tv4s.jpg'},
								{key: '55英寸 4X', img: 'icon-tv4x2.jpg'}

						],
						titleImg: 'title-phone.jpg',
						last: true
					}
				]
			}
		},
		methods:{
	        spyDomChange(node) {
	            if (this.activeMenu != node.name)
	                this.activeMenu = node.name
	        },
	        scrollTo(name){
	            scrollWatch.scrollTo(name)
	        }
	    },
		// created() {
		// 	scrollWatch.setContainer('.list-rightbar')
		// }
	}
</script>
<style lang="scss" scoped>
	.container {
		padding-bottom: 50px;
		padding-top: 50px;
		background: #fff;
		color: #3c3c3c;
		margin: 0 auto;
		flex-basis: 100%;
		.list-navbar {
			position: fixed;
			top: 50px;
			bottom: 50px;
			left: 0;
			width: 100px;
			// padding-left: 10px;
			// padding-right: 10px;
			border-right: 1px solid #efefef;
			overflow: hidden;
			.left-bar {
				z-index: 90;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: -8px;
				padding: 6px 8px 6px 0;
				background: #fefefe;
				overflow-y: auto;
				li {
					font-size: 30px;
					height: 60px;
					line-height: 60px;
					overflow: hidden;
					text-align: center;

				}
			}
		}
		.list-wrap {
			padding: 10px;
			margin-left: 100px;
			color: #3c3c3c;
			overflow-y: auto;
			.title-img-wrap > img{
				height: auto;
				display: block;
				width: 80%;
				margin: 0 auto;
			}
			.title {
				background-color: #fff;
				font-size: 25px;
				text-align: center;
				font-weight: 400;
				margin-top: 10px;
				height: 80px;
				line-height: 80px;
				overflow: hidden;
				& > span {
					position: relative;
				}
				& > span:before {
					content: '';
					position: absolute;
					top: 50%;
					width: 30px;
					border-top: 3px solid #e0e0e0;
					transform: translate3d(-150%, -50%, 0);
				}
				& > span:after {
					content: '';
					position: absolute;
					left: auto;
					top: 50%;
					right: 0;
					transform: translate3d(150%, -50%, 0);
					width: 30px;
					border-top: 3px solid #e0e0e0;
				}
			}
			.category-group {
				background-color: #fff;
				margin: -5px 0 0;
				display: flex;
				// justify-content: space-around;
				// align-items: center;
				width: 100%;
				.box {
					width: 100%;
					// display: flex;
					overflow: hidden;
					// justify-content: space-around;
					// align-items: center;
					flex: 1 1 auto;
					.product {
						float: left;
						width: 33.3333%;
						text-align: center;
						margin-top: 20px;
						margin-bottom: 22px;
						overflow: hidden;
						.product-icon {
							width: 100%;
						}
					}
				}
			}
		}
	}
	.active {
    	color: red;
    	font-size: 40px!important;
    	font-weight: 500;
	}
</style>