<template>
	<div>
		<sticky-header>
			<p slot="title" class="title">
				{{ title }}
			</p>
		</sticky-header>
		<cate></cate>
	</div>
</template>
<script>
	import StickyHeader from '../components/StickyHeader'
	import Cate from '../components/Cate'
	export default {
		name: 'Categories',
		components: {
			StickyHeader,
			Cate
		},
		data() {
			return {
				title: '分类'
			}
		},
	}
</script>
<style lang="scss" scoped>
	.title {
		margin: 0 auto;
	}
</style>