<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">登录页</h1>
    </v-header>
    <section>
      <mt-field
       label="账号"
        placeholder="请输入账号"
        type = "text"
        v-model = "username"
        :disableClear = '!toggle'
        ></mt-field>
      <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="password"
       :disableClear = '!toggle'
        ></mt-field>
      <router-link style="color: aqua;padding-left: 5%" :to="{name:'验证码登录'} ">
        验证码登录
      </router-link>
      <router-link style="color: aqua;padding-left: 70%" :to="{name:'注册'} ">
        注册
      </router-link>
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
      user:""
    }
  },
  components:{
    'v-header':Header
  },
  data(){
    return {
      username:'',
      password:'',
      toggle:!this.$store.state.login.token
    }
  },
  create(){
    alert(2)
    if(this.$route.query!="") {
      this.$router.replace({
        path: 'user',
        query: {user: this.user}
      })
    }
  },
  methods:{
    // 登录按钮
    login(){

      this.$api({
        method: 'post',
        url: '/login?username='+this.username+'&password='+this.password+''
      }).then((res) => {
        console.log(res)
        if(res.data !="") {
          Toast('登录成功,存储token,跳转网页');
          this.toggle = false;
          this.user=res.data;
          this.$store.commit('CHANGE_TOKEN',1);
          this.$store.commit('USER_NAME',this.user.username);
          sessionStorage.setItem("username", this.user.username);
          sessionStorage.setItem("id", this.user.id);

          sessionStorage.setItem("token",this.user.token)
          setTimeout(()=>{
            this.$router.replace({
              path: 'user'

            })
          },1000);
        }else {
          Toast('账号密码错误');
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
