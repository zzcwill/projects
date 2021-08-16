<template>
	<div class="baseLayout">
		<header>
			<slot name="header">1</slot>
		</header>
		<main>
			<slot>2</slot>
		</main>
		<footer>
			<slot name="footer">3</slot>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'BaseLayout',
		props: {
			title: {
				type: String,
				default: 'popupTitle'
			},			
			text: {
				type: String,
				default: 'popupText'
			},
			callBack: {
				type: Function,
				default: () => {

				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
		},
	}
</script>

<style lang="less">
</style>