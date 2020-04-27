<template lang="html">
  <div class="main">
    <h2>{{ _datas.name}}</h2>
    <ul>
      <li
         v-for="(k,i) in dishes"
         :key='i'
      >
        <router-link :to="{name:'详情页',query:{object:k}} ">
          <img v-lazy="k.image"><h3>{{k.title}}</h3>
          <span> {{k.salePrice}}</span>
        </router-link>
      </li>

    </ul>
    <v-baseline/>
  </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
import common from "../../util/common";
import Baseline from '@/common/_baseline.vue'
export default {
  components:{
    'v-baseline': Baseline
  },
  data() {
    return {
      dishes:[],


    }
  },
  props: {
    datas:{
      type:Array,
      default:function(){
        return []
      }
    }
  },

  computed: {

    // 获取当前aside栏选择的是第几个
    tabIndex () {
      return this.$store.state.category.tabIndex
    },
    _datas (){
      /*console.log(this.datas[0])*/
      /*  console.log(this.$route.params.tab);*/

     if(this.$route.params.tab=="all"){
        this.$route.params.tab=sessionStorage.getItem("tab");

      }
      const _datas =  {
        list:[],
        title:''
      }
      this.$api({
        method: 'post',
        url: '/dish/findDishByCategorysId?categoryId='+this.$route.params.tab
      }).then((response) => {

        this.dishes = response.data;
      }).catch(function(error) {
        console.log(error)
      })
      return this.datas[this.tabIndex] || _datas
    }
  },

  /*method:{
    getDishes() {
       this.$api({
         method: 'post',
         url: '/dish/findDishByCategorysId?categoryId='+this.$route.params.tab
       }).then((response) => {
         this.dishes = response.data;
       }).catch(function(error) {
         console.log(error)
      })}*/
/*}*/






}
</script>

<style lang="less" scoped>
.main {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 9.8;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  > h2 {
    font-size: 24px;
    padding: 2vw 4vw;
    color: #333;
    letter-spacing: 2px;
    background-color: rgb(247, 247, 247);
  }
  > ul {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: rgb(247, 247, 247);

    li {
      background-color: rgb(247, 247, 247);
      width: 33%;
      text-align: center;
      a {
        color: #666;
        display: block;
        img {
          display: block;
          width: 60%;
          margin: 4vw auto;
        }
        span {
          text-align: center;
        }
      }
    }
  }
}
</style>
