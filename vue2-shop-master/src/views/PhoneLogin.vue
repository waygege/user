<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">手机登录页</h1>
    </v-header>
    <section>
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type = "text"
        v-model = "phone"
        :disableClear = '!toggle'
      ></mt-field>
      <mt-field
        label="验证码"
        placeholder="请输入验证码"
        type="captcha"
        v-model="captcha"
        :disableClear = '!toggle'
      ><mt-button
        plain
        size="large"
        @click="sendCaptcha"
      >发送验证码</mt-button></mt-field>

    </section>
    <mt-button
      plain
      size="large"
      @click="login"
    >登录</mt-button>


  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import { Toast } from 'mint-ui'
  export default {
    data(){
      return{
        user:"",
        phone:"",
        captcha:"",
        toggle:!this.$store.state.login.token
      }
    },
    components:{
      'v-header':Header
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
          url: '/sendCaptcha?phone='+this.phone
        }).then((res) => {
          console.log(res.data)
          if(res.data!="") {
            Toast('发送成功');
          }
        }).catch((error) => {
          console.log(error)
        })

      },
      // 登录按钮
      login(){

        this.$api({
          method: 'post',
          url: '/phoneLogin?phone='+this.phone+'&captcha='+this.captcha+''
        }).then((res) => {
           console.log(res.data)
          if(res.data !="") {
            Toast('登录成功,存储token,跳转网页');
            this.toggle = false;
            this.user=res.data;
            this.$store.commit('CHANGE_TOKEN',1);
            sessionStorage.setItem("username", this.user.username);
            setTimeout(()=>{
              this.$router.replace({
                path: 'user'

              })
            },1000);
          }else {
            Toast('登录失败');
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
