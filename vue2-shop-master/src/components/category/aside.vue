<template lang="html">
  <aside class="aside">
    <ul>
      <li v-for="(k,i) in datas" @click='changeTabIndex(i)'>
        <span><i :class="k.icon" style="float: left;padding-top: 25%;padding-left: 20%"></i><router-link :to="{path:'/category/'+k.id}" :class='{active:i==tabIndex}' >{{k.name}}</router-link>
         </span></li>
    </ul>

  </aside>
</template>

<script>
  export default {
    data() {
      return {
        //对应mt-tab-item 的id值
        i: 0
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
    computed:{
      tabIndex(){
        return this.$store.state.category.tabIndex
      }
    },
    methods:{
      changeTabIndex(i) {

         this.$store.commit('CHANGE_TABINDEX',i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .aside {
    flex: 2.2;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: gold;
    &::-webkit-scrollbar {display:none}
    > ul {
      height: 100%;
      width: 100%;
      li {
        text-align: center;
        a {
          display: block;
          padding: 4vw 0;
          position: relative;
          font-size: 16px;
        }
        .active {
          position: relative;
          font-size: 22px;
          &::before {
            width: 3px;
            height: 28px;
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -14px;
            background-color: green;
          }
        }
      }
    }
  }
</style>
