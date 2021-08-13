<template>
	<div class="Popup2" v-show="visible">
		<div class="mask"></div>
		<div class="content">
			<div class="top">
				<div class="title">{{title}}</div>
				<div class="txt">{{text}}</div>
			</div>
			<div class="bottom">
				<button @click="sure">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Popup2',
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
				visible: false
			}
		},
		methods: {
			open() {
				this.visible = true
			},
			hide() {
				this.visible = false
			},
			changeVisible() {
				this.visible = !this.visible
			},
			sure() {
				this.visible = false
				this.callBack()
			}
		},
	}
</script>

<style lang="less">
	.Popup2 {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1000;

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			opacity: 0.1;
			background-color: #000;
			z-index: 1001;
		}

		.content {
			position: absolute;
			width: 560px;
			height: 290px;
			top: 50%;
			left: 50%;
			margin-left: -280px;
			margin-top: -145px;
			background-color: #fff;
			border-radius: 10px;
			z-index: 1002;
			box-shadow: #eee 0px 0px 5px;

			.top{
				height:190px;
				border-bottom:1px solid #e5e5e5;
				.title{
					padding-top:60px;
					font-size:33px;
					color:#333;
					text-align: center;
				}
				.txt{
					margin-top: 34px;
					text-align:center;
					font-size:30px;
					color:#999;
				}
			}
			
			.bottom{
				height:100px;
				button{
					display: block;
					margin:0 auto;
					margin-top:34px;
					border:none;
					font-size:34px;
					color:#ed1c24;
					background-color:#fff;
				}
			}
		}
	}
</style>