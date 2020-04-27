<template>
  <div >
    <!-- slot分发内容 让子组件混合父组件的内容 -->
    <v-eheader>
      <h1 slot="title">评价</h1>
    </v-eheader>

    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="evaluate.content">
    </el-input>
   <div style="margin-top:5%;margin-left: 5%">
    <el-rate

      v-model="evaluate.stars"
      show-text
    >
    </el-rate>
   </div>
    <div style="margin-left: 30%;margin-top:10%">
    <mt-button
      plain
      width="30%"
      @click="sendEveluate"
    >发布评价</mt-button>
    </div>
  </div>
</template>

<script>
  import EHeader from '@/common/EvaluateHeader.vue'
  import {Toast} from "mint-ui";
  export default {
    components:{
      'v-header':Header,
    },
    data(){
      return{
        evaluate:{
          content:"",
          stars:""
        },
      }
    },
    methods:{
      sendEveluate(){
        this.evaluate.billNumber=this.$route.query.out_trade_no;
        this.evaluate.userId=sessionStorage.getItem("id");
        this.$api({
          method: 'post',
          url: '/evaluate/sendEvaluate',
          data:this.evaluate
        }).then((res) => {
          Toast('发布成功');
          setTimeout(()=>{
            this.$router.replace({
              path: 'user'

            })
          },1000);
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
