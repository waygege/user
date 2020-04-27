<template lang="html">
  <section class="content">
    <div class="img-wrap" >
     <!-- <img :src="content.image">-->
      {{content.description}}
    </div>
  </section>

</template>

<script>
export default {
  computed:{
    content(){

            return this.$route.query.object;
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    width: 100%;
    margin-top: 10px;
    border-top: 20px solid #F8FCFF;
    .img-wrap {
    height: 120vw;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
