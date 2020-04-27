<template lang="html">
  <div class="wrap">
    <v-header class="header">
      <h1 slot="title">菜品分类</h1>
    </v-header>
    <section class="view">
      <!--这里面一个datas进行值得传递-->
      <v-aside :datas="allData.aside"/>
      <router-view
        :datas="allData.aside"
      />
    </section>
  </div>
</template>

<script>

import Header from '@/common/_header.vue'
import Aside from '@/components/category/aside.vue'
import category from '@/http/mock.js' //模拟数据
export default {
  components: {
    'v-header': Header,
    'v-aside': Aside,

  },
  data () {
    return {

      allData: {
        aside:[],


      }
    }
  },
  created () {
    this.$api({
      method: 'post',
      url: '/category/findAllCategorys'
    }).then((res) => {

      this.allData.aside= res.data;
      sessionStorage.setItem("tab",res.data[0].id)

    }).catch((error) => {
      console.log(error)
    });

  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;

  .view {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>
