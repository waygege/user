<template lang="html">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="k in Banners" :key="k.id">
        <router-link :to="{ name: '广告详情页',query:{object:k}}">
          <img :src="k.bannerPicture">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>

</template>

<script>
export default {
data(){
  return{
    Banners:""
  }
},
  mounted(){
    this.$api({
      method: 'get',
      url: '/banner/findShowBanners'
    }).then((res) => {
      console.log(res.data)
      this.Banners=res.data;
    })
  }
}
</script>

<style lang="less" scoped>

.mint-swipe {
  width: 100%;
  height:50vw;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
}
</style>
