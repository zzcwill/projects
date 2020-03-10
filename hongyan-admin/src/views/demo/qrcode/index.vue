<template>
  <div class="app-container">
    <qr-code text="1111111111111"></qr-code>
  </div>
</template>

<script>
import qrCode from '@/components/qrcode' // use clipboard directly

export default {
  components: { qrCode }
}
</script>

