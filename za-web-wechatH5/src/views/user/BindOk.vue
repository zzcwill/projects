<template>
  <div class="BindOk">
		<div class="stateBox">
			<div class="bg">
				<img src="../../assets/images/bindOk/1.png" >
			</div>
			<div class="state">
				<img src="../../assets/images/bindOk/2.png" class="ok">
				<p class="tip">账号绑成功</p>
				<button class="back" @click="closeH5">关闭</button>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'BindOk',
  metaInfo: {
    title: '绑定成功',
    meta: [{
      name: 'keywords',
      content: '振安汇盈（上海）资产管理有限公司'
    }]
  },
  data () {
    return {

    }
  },
  mounted () {
    
  },
  methods: {
		closeH5() {
			/* eslint-disable */
			if(WeixinJSBridge === undefined) {
				return			
			}
			WeixinJSBridge.call('closeWindow')
			/* eslint-disable */
		}
  }
}
</script>

<style lang="less">
		.BindOk{
			.stateBox{
				position: relative;
				width:750px;
				height:600px;
				.bg img{
					display:block;
					width:750px;
					height:600px;
				}
				.state{
					position: absolute;
					top: 226px;
					left:30px;
					right: 30px;
					.ok{
						margin:0 auto;
						display: block;
						width:200px;
						height:200px;
					}
					.tip{
						margin-top:60px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						font-size:30px;
						color: #999;
					}
					.back{
						margin-top: 100px;
						display: block;
						width: 690px;
						height: 88px;
						border-radius: 440px;
						background-color: #ed1c24;
						color: #fff;
						font-size: 30px;
						line-height: 88px;
						text-align: center;						
					}
				}
			}
		}	
</style>
