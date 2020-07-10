<template>
  <div class="Header">
   <div class="logoContainer">
     <div class="logo">
       <img src="../assets/logo.png">
     </div>
   </div>
  <li><router-link :to="'/index_article/23'">网站首页</router-link></li>
   <li><router-link :to="'/content/'+active_id">部落首页</router-link></li>
   <li><router-link :to="'/login/'+active_id">用户登录</router-link></li>
   <li v-if="isActive" class="userStyle">欢迎您!{{logiUser}}</li>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        isActive:false,
        logiUser:this.$store.state.loginUser
      }
    },

    //参数
    props:[
      'active_id'
    ],
    created(){
      this.emptyLoginUser()
    },
    methods:{
      //检查vuex有没有这个数据
      emptyLoginUser(){
        if(this.$store.state.loginUser==''){
          this.isActive = false;
        }else{
          this.isActive = true;
        }
      }
    },
    watch:{
      loginUser(){
        this.emptyLoginUser()
      }
    }
  }
</script>

<style>
  .Header{
    height: 10vh;
    background-color: white;
    display: flex;

  }
  .Header li{
    flex: 1;
    text-align: center;
    list-style: none;
    line-height: 2.5em;
    font-size: 1.5em;
  }
  .userStyle{
    color: #90EE90;
    font-weight: 1000;
  }
  .logoContainer{
    flex: 1;
  }
  .logo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    border: 5px solid lightgreen;
    box-shadow: darkgrey 10px 10px 30px 5px;
  }
  .logo img{
    width: 100px; height: 100px;
  }
  .router-link-active {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
</style>
