<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">购物车</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something v-if="userName"/>
      <v-nothing v-else/>
      <div v-if="count==0">
      <router-link class="nothing-toshop" :to="{name:'分类页'}"  >
        <p>购物车是空的</p>
        <router-link :to="{ name: '分类页', params: {} }">去逛逛</router-link>
      </router-link>
      </div>
      <v-footer/>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import Something from '@/components/car/something.vue'
import Footer from '@/components/car/footer.vue'

export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },

  computed:{
    count(){
      return this.$store.state.detail.count;
    },
    userName(){
    return sessionStorage.getItem("username");
    }
  },
  mounted(){
    // 防止刷新页面数据为空
    if (this.$store.state.detail.count=="") {
      this.$store.commit('RESET_COUNT')
    }
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 14vw;
}
.nothing-toshop {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: space-between;
  padding: 2vw 6vw;
  align-items: center;
  background-color: rgba(244, 244, 244, 0.3);
  &:active {
    background-color: #f2f2f2;
  }
  a {
    padding:1vw 2vw;
    background-color: #ffb300;
    border-radius: 1.5vw;
    color:#fff;
  }
}
</style>
