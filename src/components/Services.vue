<template>
	<div class="container">
		<sticky-header>
			<p slot="title" class="title">
				{{ title }}
			</p>
		</sticky-header>
		<div class="services-wrap">
			<div class="self-service">
				<h4>自助服务</h4>
				<div class="service-ul">
					<ul>
						<li v-for="index in 8">
							<div class="service-cell">
								<img :src="require('../assets/img/' + 'self-service-' + (index % 4) + '.png')" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="outline-service">
				<div class="outline-wrap">
					<a href="javascript:;">
						<img :src="require('../assets/img/7-24.png')" alt="">
						<span>7*24小时在线客服</span>
					</a>
				</div>
				<div class="tel">
					<ul>
						<li v-for="(item, index) in telList">
							<img :src="require('../assets/img/' + 'tel-' + index + '.png')" alt="">
							<h3>{{item.text}}</h3>
							<p class="tel-call">{{item.call}}</p>
							<p class="tel-time">{{item.time}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import StickyHeader from '../components/StickyHeader'
	export default {
		name: 'Services',
		components: {
			StickyHeader
		},
		data() {
			return {
				title: '服务',
				telList: [
					{text: '商城热线', call: '400-100-5678', time: '8:00 - 18:00'},
					{text: '金融热线', call: '400-100-3399', time: '9:00 - 18:00'},
					{text: '小米移动', call: '400-922-3838', time: '8:00 - 18:00'}
				]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
	}
	.title {
		margin: 0 auto;
	}
	.services-wrap {
		width: 100%;
		padding: 50px 0;
		.self-service {
			border-bottom: 1px solid #f6f6f6;
			width: 100%;
			.service-ul {
				display: flex;
			}
			h4 {
				margin: 0;
			    margin-left: .20px;
			    font-size: 18px;
			    height: 40px;
			    line-height: 40px;
			    border-bottom: 1px solid #f6f6f6;
			    color: #919191;
			    font-weight: 400;
			    text-align: left;
			}
			ul {
				padding: 0;
				margin: 0;
				flex: 1 1 auto;
				overflow: hidden;
				width: 100%;
				li {
					float: left;
					width: 25%;
					overflow: hidden;
					.service-cell {
						// width: 100%;
						img {
							width: 100%;
						}
					}
				}
			}
		}
	}
	.outline-service {
		text-align: center;
		.outline-wrap {
			border-bottom: 1px solid #f6f6f6;
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10px 0;
				font-size: 18px;
				color: #333;
				cursor: pointer;
				img {
					width: 40px;
					height: 40px;
					border-style: none;
				}
				span {
					margin-left: 10px;
					align-self: center;
				}
			}
		}
		.tel {
			padding: 10px 0;
			ul {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 20px auto;
				padding: 0;
				li {
					img {
						width: 70px;
						height: 70px;
						display: block;
						margin: 0 auto;
					}
					h3 {
						font-size: 18px;
						font-weight: 400;
						color: #333;
						line-height: 1.5em;
						margin: 10px 0;
						display: block;
					}
					.tel-call {
						color: #ff6700;
						font-size: 15px;
					}
					.tel-time {
						color: #969696;
						font-size: 15px;
					}
				}
			}
		}
	}
</style>