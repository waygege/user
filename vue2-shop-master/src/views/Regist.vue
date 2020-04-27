<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">注册页</h1>
    </v-header>
    <section>
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type = "text"
        v-model ="phone"

      ></mt-field>
      <mt-field
        label="验证码"
        placeholder="请输入验证码"
        type="text"
        v-model="captcha"

      ><mt-button
        plain
        size="large"
        @click="sendCaptcha"
      >发送验证码</mt-button></mt-field>

    </section>
    <mt-button
      plain
      size="large"
      @click="regist"
    >注册</mt-button>


  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import { Toast } from 'mint-ui'
  export default {
    data(){
      return{
        phone:"",
        captcha: "",

      }
    },
    components:{
      'v-header':Header
    },
    data(){
      return {

      }
    },
    create(){
      if(this.$route.query!="") {
        this.$router.replace({
          path: 'user',
          query: {user: this.user}
        })
      }
    },
    methods:{
      sendCaptcha(){
        this.$api({
          method: 'post',
          url: '/phone/getPhone?phone='+this.phone
        }).then((res) => {
          console.log(res.data)
          if(res.data!="") {
            Toast('发送成功');
          }else {
            Toast('手机号被注册了');
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 登录按钮
      regist(){

        this.$api({
          method: 'post',
          url: '/phone/verificationPhone?phone='+this.phone+'&captcha='+this.captcha
        }).then((res) => {
          console.log(res.data)
          if(res.data !="") {
            Toast('验证成功，跳转到填写信息页');

            this.user=res.data;
            this.$store.commit('CHANGE_TOKEN',1);
            sessionStorage.setItem("phone", this.phone);
            setTimeout(()=>{
              this.$router.replace({
                path: 'registInformation'

              })
            },1000);
          }else {
            Toast('账号密码不能为空');
          }



        }).catch((error) => {
          console.log(error)
        })

        // 登录成功
      },

      //退出登录按钮

    }
  }

</script>

<style lang="less" scoped>
  .login {
    >section {
      .tip {
        padding: 6vw 3vw;
        color:rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }
</style>
