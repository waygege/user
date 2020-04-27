<template>
  <v-header>
    <h1 slot="title">支付订单</h1>
  </v-header>
  <div class="pay-confirm" v-else>
    支付成功!!!</br>
  </div>
</template>

<script>
    export default {
        name: "paySuccess",
      components: {
        'v-header': Header
      },
    }
</script>

<style scoped>

</style>
