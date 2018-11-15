<template>
	<div class="container">
		<sticky-header>
			<p slot="title" class="title">
				{{ title }}
			</p>
		</sticky-header>
		<div class="text-wrap">
			<p>请前往小米商城App查看会员福利</p>
		</div>
		<div class="btn-wrap">
			<div class="btn">
				立即下载小米商城App
			</div>
		</div>
	</div>
</template>
<script>
	import StickyHeader from '../components/StickyHeader'
	export default {
		name: 'Mpointsmall',
		components: {
			StickyHeader,
		},
		data() {
			return {
				title: '会员中心'
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
	.text-wrap {
		position: relative;
		margin: 100px auto;
		font-size: 30px;
		font-weight: 400;
		p {
			text-align: center;
		}
	}
	.btn-wrap {
		margin: 0 100px;
		.btn {
			display: block;
			outline: 0;
			background: #ff6700;
			color: #fff;
			text-align: center;
			width: 100%;
			height: 60px;
			line-height: 60px;
			font-size: 20px;
		}
	}
</style>