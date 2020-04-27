<template>
  <div class="car">
    <!-- slot分发内容 让子组件混合父组件的内容 -->
    <v-header>
      <h1 slot="title">广告详情</h1>
    </v-header>
  </div>
<!--  <mt-swipe-item >
    <img :src="banner.image">
  </mt-swipe-item>-->

</template>

<script>
import Header from '@/common/_header.vue'
  export default {
    components:{
      'v-header':Header,
    },
    computed:{
      banner(){
        return this.$route.query.object;
      }
    }
    }
</script>

<style scoped>
  .car {
    width: 100%;
    padding-bottom: 14vw;
  }
</style>
