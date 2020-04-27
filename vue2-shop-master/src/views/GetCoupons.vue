<template>
  <div class="car">
    <!-- slot分发内容 让子组件混合父组件的内容 -->
    <v-header>
      <h1 slot="title">兑换优惠卷</h1>
    </v-header>
    <ul class="section4-list">
      <li v-for="(k,i) in couponsList" >
        <div style="width: 80%;height:80px;margin-bottom:10px;margin-left:10%;border:2px solid">
          <div style="width:30%;height:100%;background: #3dd5c8;float:left">
             <span style="font-size: 50px;margin-bottom:10px;">￥{{k.size}}
             </span>
          </div>
          <div >
             <span style="font-size:40px;margin-bottom:20px;float:left">{{k.couponsName}}
             </span>&nbsp;&nbsp;
            <span style="font-size:20px;float:left;margin-left:20px; margin-top:20px">积分:{{k.integration}}
             </span>
          </div>
          <mt-button style="float:right;margin-top:15px"
            plain
            size="small"
            @click="get(k.id)"
          >兑换</mt-button>
        </div>
      </li>

    </ul>
  </div>

</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast} from "mint-ui";
  export default {
    components:{
      'v-header':Header,
    },
    data(){

      return{
        couponsList:[]
      }
    },
    mounted(){
      this.$api({
        method: 'get',
        url: '/coupons/findAllCoupons'
      }).then((res) => {
        this.couponsList=res.data;
        console.log(this.couponsList)
      })
    },
    methods:{
      get(couponsId){
        this.$api({
          method: 'post',
          url: '/couponsDetails/sendCouponsDetails?couponsId='+couponsId+'&userIds='+sessionStorage.getItem('id')
        }).then((res) => {
          console.log(res.data)
           if(res.data=="success"){
             Toast('兑换成功');
           }else if(res.data=="fail"){
             Toast('兑换失败');
           }
        })
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
