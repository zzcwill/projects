<template>
  <div>
    <canvas id="msg" />
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: 'Qrcode',
    props: {
      size: {
        type: Number,
        default: 300
      },
      text: {
        type: String,
        default: ''
      }
    },
    mounted() {
      let msg = document.getElementById('msg')
      QRCode.toCanvas(msg, this.text, {width: this.size, height: this.size, margin: 1}, function (error) {
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
