<template>
 <!-- <div>
    <input type="text" v-model="form.username"/>
    <input type="text" v-model="form.password"/>
    <input type="button" value="登录" @click="login()"/>
  </div> -->

  <div class="login_container">
    <div class="Box">
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png">
        </div>
        <div class="form_class">
          <el-form :rules="loginFormRules">
            <!-- 用户 -->
            <el-form-item prop="username" label="用户名:">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码:">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="login()">登录</el-button>
              <el-button type="info">注册</el-button>
            </el-form-item>
          </el-form>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex';
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        id:this.$route.params.id,
        form:{
          username:'',
          password:''
        },
        loginFormRules:{
          //验证用户名是否合法
          username:[
              {required: true, message: '请输入登录名称', trigger: 'blur' },
              {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur' },
            {min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ]
        },
        userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || []
      }
    },
    methods:{
      ...mapActions(['VuexFunction']),
      async login(){
        await this.$axios.post("http://localhost/php/sfkbbs/before/login.php",stringify(this.form)).then(result=>{
          if(result.data=='200'){
            // let token = this.form.username;
            var obj = {
              username:this.form.username
            }
            console.log(obj);
            this.userInfo.push(obj);
            sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo));
            // this.$cookie.set('token',token,expiresTime);
             this.$router.push('/article/'+this.id);
             this.VuexFunction(this.form.username);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login_container{
    background-color: #006666;
    height: 100%;
    display: flex;
    align-items: center;       /*垂直居中*/
    justify-content: center;   /*水平居中*/
  }
  .Box{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_box{
    width: 450px;
    height: 450px;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    flex-wrap:wrap;
    -webkit-box-shadow:0 0 10px green;
  }
  .avatar_box{
    width: 100%;
    height: 30%;
    border-radius: 50%;
    text-align: center;
    padding: 1%;
  }
  .avatar_box img{
      width: 30%;
      height: 100%;
      border-radius: 50%;
      border: green solid 1px;
      padding: 1%;
      -webkit-box-shadow:0 0 10px green;
  }
  .form_class{
    width: 100%;
    height: 50%;
    padding: 0 10%;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
</style>
