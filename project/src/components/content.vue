<template>
  <div>
    <!-- <div v-for="item in module">{{item.module_name}}</div>
    <div class="container" v-for="item in content">
      <div class="module">{{item.module_name}}</div>
      <div class="title">{{item.title}}</div>
      <div class="content">
            <router-link :to="'/article/'+item.id">{{item.content}}</router-link>
      </div>
    </div> -->
    <div class="container">
      <div class="Header">
        <div class="logoContainer">
          <div class="logo">
            <img src="../assets/logo.png">
          </div>
        </div>
        <!-- <h2>欢迎来到{{module_name}}兴趣部落灌灌灌灌灌哈哈哈</h2>  -->
      </div>
      <div class="bodys">
          <div class="module_title">
            <div class="module_info">
              <span><i class="el-icon-s-home"></i>部落:{{module_name}}</span>
              <span><i class="el-icon-s-data"></i>部落文章数:123</span>
            </div>
          </div>
          <div style="width: 80%;display: flex; flex-wrap: wrap; margin-top: 20px;">
            <div class="content" v-for="item in article">
                <img :src="item.title_src" alt="" width="100px" height="100px"/>
                <div class="module_message">
                  <span><i class="el-icon-s-order"></i>标题:{{item.title}}</span>
                  <span><i class="el-icon-time"></i>发布时间:{{item.time}}</span>
                  <span><i class="el-icon-location"></i><router-link :to="'/article/'+item.id">阅读文章--></router-link></span>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        id:this.$route.params.id,
        module:[],
        content:[],
        article:[],//每一篇具体的文章
        banner_src:'',                   //部落头像
        module_name:''                    //部落名称

      }
    },
    async created(){
      this.getAllSonmodule(),
      // this.getContent(),
      this.block()
      // this.huifu()
    },
    methods:{
      async getAllSonmodule(){
        await this.$axios.get("before/all_sonmodule.php?id="+this.id).then(result=>{
          console.log(result.data);
          this.module_name = result.data[0].module_name;
          this.banner_src = result.data[0].module_src;
        })
      },
      async getContent(){
        await this.$axios.get("before/all_content.php?id="+this.id).then(result=>{
          // console.log(result.data);
          this.content = result.data;
        })
      },
      async block(){
        await this.$axios.get("before/all_article.php?id="+this.id).then(result=>{
          console.log(result.data);
          this.article = result.data;
        })
      }
    }
  }
</script>

<style scoped>
  a{
    color: red;
    text-decoration: none;
  }
  .container{
    width: 100%;
    height: 100%;
    background-color: #f5f6f7;
  }
  .Header{
    height: 10vh;
    background-color: white;
  }
  .bodys{
    /* margin-top: 20px; */
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    flex-flow: row wrap;
  }
  .banner{
    height: 400px;
    width: 80%;
    background-color: red;
  }
  .content{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-self:flex-end;
    border-bottom: 1px solid #CCCCCC;
    margin-top: 10px;
  }
  .content img{
    border-radius: 10px;
  }
  .module_message{
    display: flex;
    flex-wrap: wrap;
  }
  .module_message span{
    width: 100%;
  }
  .module_title{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .module_info{
    width: 200px;
    display: flex;
    flex-wrap: wrap;
  }
  .module_info span{
    line-height: 30px;
    width: 100%;
    font-size: 1.5em;
    font-weight: bold;
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
</style>
