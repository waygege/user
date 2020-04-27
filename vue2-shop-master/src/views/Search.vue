<template lang="html">

  <div class="car">
    <v-header>
      <h1 slot="title">搜索页</h1>
    </v-header>
    <mt-field
      class="searchs"
      placeholder="请输入搜索内容"
      type = "text"
      v-model = "dish.title"
    ><mt-button
      icon="search"
      @click="searchDish"
    ></mt-button> </mt-field>

    <span class="section4">

      <ul class="section4-list">
        <li v-for="k in dishes" :key='k.id'>
          <router-link :to="{name:'详情页',query:{object:k}}">
            <img v-lazy="k.image">

          </router-link>
          <h3>{{k.title}}</h3>
          <span>￥ {{k.salePrice}}</span>
        </li>

      </ul>

    </span>

  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
export default {
  data(){
    return{
      dishes:"",
      dish:{title:""}
    }
  },
  components:{
    'v-header':Header,
  },
  methods:{
    searchDish(){

      this.$api({
        method: 'get',
        url: '/dish/findDishes?title='+this.dish.title

      }).then((res) => {
        console.log(res.data)
        this.dishes=res.data;
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  .searchs{
    width: 70%;
    padding-left: 15%;
  }
  .car {
    width: 100%;
    padding-bottom: 14vw;
  }
  .section4 {
    width: 100%;
    overflow: hidden;
    .pt();
    .section4-title {
      .bt();
      text-align: center;
      .fz(font-size, 40);
      padding: 4vw 0;
      position: relative;
      background-color: #ffffff;
      i {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);
        &::before {
          color: #9f9f9f;
        }
      }
    }

    .section4-list {
      width: 100%;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      overflow: hidden;
      li {
        width: 50%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 3vw;
        > a {
          display: block;
          width: 100%;
          position: relative;
          img {
            display: block;
            width: 100%;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: gold;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 1.2vw 2vw;
          }
        }

        > h3 {
          padding-top: 3vw;
          .fz(font-size,40);
        }
        > span {
          display: inline-block;
          padding-bottom: 3vw;
          color: #b4282d;
        }
      }
    }

    .section4-banner {
      width: 100%;
      display: block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
