<template>
  <div class="Header">
   <div class="logoContainer">
     <div class="logo">
       <img src="../assets/logo.png">
     </div>
     <span class="WebTitle">阿贤个人网</span>
   </div>
  <li><router-link :to="'/index_article/23'">网站首页</router-link></li>
   <!-- <li><router-link :to="'/content/'+id">部落首页s</router-link></li> -->
   <li><router-link :to="'/login/'+active_id">登录</router-link></li>
   <li v-if="isActive" class="userStyle">欢迎您!{{logiUser}}</li>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        isActive:false,
        logiUser:this.$store.state.loginUser,
        id:this.$route.params.id
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
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
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
    font-weight: bold;
  }
  .WebTitle{
    position: absolute;
    font-size: 1.5em;
    background-color: lightgreen;
    margin-left: 10%;
    top: 1.5em;
    font-weight: 1000;
    /* margin-bottom: 0; */
    padding: 5px 5px;
    /* position: absolute; left: 200px; top: 50px; background-color: #13CE66; */
  }
</style>
