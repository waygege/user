<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">完善信息</h1>
    </v-header>
    <section>

      <label style="float: left;padding-left:1%;padding-top:1% ">头像</label>
      <div style="border:1px dashed ;width:40px;height:40px;margin-left: 20%">
        <el-upload
          class="avatar-uploader"
          style="width:20%; height:20%"
          action="111"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" enctype="multipart/form-data"  >
          <img v-if="newUser.avatar" :src="newUser.avatar" class="avatar" enctype="multipart/form-data" style="width:40px;height:40px">
          <i v-else class="el-icon-plus avatar-uploader-icon" style="width:40%; height:40%"></i>
        </el-upload>
      </div>
      <br/>


      <mt-field
        label="昵称"
        type = "text"
        placeholder="请输入昵称"
        v-model = "newUser.nickName"

      ></mt-field>
      <mt-field
        label="账号"
        placeholder=""
        type="text"
        placeholder="请输入账号"
        v-model="newUser.username"

      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="text"
        v-model="newUser.currentPassword"

      ></mt-field>
      <mt-field
        label="确认密码"
        placeholder="请输入密码"
        type="text"
        v-model="confirmPassword"

      ></mt-field>
      <br/>
      <!--<label style="padding-left: 1%;padding-right: 2%">生日</label><input  type="date" style="height:20px;width:100px " v-model="user.brithday"/>
      &lt;!&ndash;ref="datePicker"&ndash;&gt;-->
      <label style="float: left;padding-left:1% ">生日</label>
        <el-date-picker
          v-model="newUser.birthday"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          style="margin-left: 5%"
        >
        </el-date-picker>


    </section>
    <mt-button
      plain
      size="large"
      @click="regist"
    >完成</mt-button>


  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import { Toast } from 'mint-ui'


  export default {
    data(){
      return{
        newUser:{},
        confirmPassword:"",
      }
    },
    components:{
      'v-header':Header
    },

    create(){
      if(this.$route.query!="") {
        this.$router.replace({
          path: 'user',
          query: {user: this.newUser}
        })
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.newUser.avatar=res.data.name;
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          Toast('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          Toast('上传头像图片大小不能超过 2MB!');
        }
        let fd = new FormData();
        fd.append('file',file);//传文件
        fd.append('id',this.srid);//传其他参数
        this.$api({
          method: 'post',
          url: '/picture/up',
          data:fd
        }).then((res) => {
          this.newUser.avatar=res.data.name;
           console.log(this.newUser.avatar)
        })
       return isJPG && isLt2M;
      },

      // 注册按钮
      regist(){
        this.newUser.phone=sessionStorage.getItem("phone");

        if(this.newUser.avatar==""||this.newUser.currentPassword==undefined){
          Toast('头像没有上传');
        }else if(this.newUser.nickName==""||this.newUser.currentPassword==undefined){
          Toast('昵称没有填写');
        } else if(this.newUser.username==""||this.newUser.currentPassword==undefined){
          Toast('账号没有填写');
        }else if(this.newUser.currentPassword==""||this.newUser.currentPassword==undefined){
          Toast('密码没有填写');
        }else if(this.confirmPassword==""||this.confirmPassword==undefined){
          console.log(this.confirmPassword)
          Toast('确认密码没有填写');
        } else if(this.newUser.birthday==""||this.newUser.birthday==undefined){
          Toast('生日没有填写');
        }else {
          console.log(this.newUser.birthday)
          console.log(this.confirmPassword)
          if (this.newUser.currentPassword==this.confirmPassword){
            Toast('俩次密码不一样');
          }
          this.$api({
            method: 'post',
            url: '/register',
            data: this.newUser
          }).then((res) => {
            console.log(res.data)
            if (res.data == "该用户名已经被注册") {
              Toast('该用户名已经被注册');
            } else {
              if (res.data != "") {
                Toast('登录成功,存储token,跳转网页');
                this.user = res.data;
                this.$store.commit('CHANGE_TOKEN', 1);
                sessionStorage.setItem("username", this.newUser.username);
                sessionStorage.setItem("id", this.newUser.id);
                setTimeout(() => {
                  this.$router.replace({
                    path: 'user'
                  })
                }, 1000);
              } else {
                Toast('账号密码不能为空');
              }

            }

          }).catch((error) => {
            console.log(error)
          })
        }
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

  .el-form-item /deep/ .el-upload {

    width: 100px;

    height: 100px;

    line-height: 100px;

  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
