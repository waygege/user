<template lang="html">

  <div class="car">
    <!-- slot分发内容 让子组件混合父组件的内容 -->
    <v-header>
      <h1 slot="title">优惠卷</h1>
    </v-header>
    <!-- 根据购物车是否有商品加载不同的组件 -->

    <ul>
      <li v-for="(k,i) in datas">
        <div>
        <input v-model="coupons" class="border_w" type="radio" name="Q3"  :value="k"/>
        <div style="width: 80%;height:80px;margin-bottom:10px;margin-left:10%;border:2px solid">
          <div style="width:30%;height:100%;background: #3dd5c8;float:left">
             <span style="font-size: 50px;margin-bottom:10px;">￥{{k.size}}
             </span>
          </div>
          <div >
             <span style="font-size:40px;margin-bottom:20px">{{k.couponsName}}
             </span>

          </div>
          <span style="font-size:20px;margin-left:20px;margin-bottom:20px">{{k.status}}
             </span>
        </div>

        </div>
      </li>
    </ul>
    <div>
    <mt-button
      plain
      size="large"
      @click="useCoupons"
    >确定</mt-button>
    </div>
  </div>

</template>

<script>
  import Header from '@/common/_header.vue'
  import Baseline from '@/common/_baseline.vue'

  export default {
    data(){
      return{
        useCouponsId:"",
        coupons:{},
        id:"",
        datas:""
      }
    },
    components:{
      'v-header':Header,
      'v-baseline': Baseline,

    },
    methods:{
      useCoupons(){
        sessionStorage.setItem("useCouponsId",this.coupons.couponsId)
         sessionStorage.setItem("couponsId",this.coupons.id)
        this.$api({
          method: 'get',
          url: '/coupons/findById?id='+this.coupons.couponsId
        }).then((res) => {
          console.log(res.data.size)
          sessionStorage.setItem("size",res.data.size);
          this.$router.replace({
            path: '/car'
          })
        })

      }
    },

    watch:{
      useCouponsId:function(){
         console.log(this.useCouponsId);
      }
    },
    mounted(){
      this.id=sessionStorage.getItem("id")
      this.$api({
        method: 'get',
        url: '/couponsDetails/findAllCouponsDetails?id='+this.id
      }).then((res) => {

        this.datas=res.data;
        console.log(res.data)
      })
    },


  }
</script>

<style lang="less" scoped>
  .car {
    width: 100%;
    padding-bottom: 14vw;
  }
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
