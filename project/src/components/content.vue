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
        <h2>欢迎来到{{module_name}}兴趣部落11222221</h2>
      </div>
      <div class="bodys">
        <div class="banner">
          <img :src="banner_src" height="400" width="100%">
        </div>
          <div style="width: 80%;display: flex; flex-wrap: wrap; margin-top: 20px;">
            <div class="content" v-for="item in article">
                <img :src="item.title_src" alt="" width="100px" height="100px"/>
                <div class="module_message">
                  <span>标题:{{item.title}}</span>
                  <span>作者:哈哈哈哈哈哈</span>
                  <span>发布时间:{{item.time}}</span>
                  <span><router-link :to="'/article/'+item.id">文章</router-link></span>
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
        await this.$axios.get("http://localhost/php/sfkbbs/before/all_sonmodule.php?id="+this.id).then(result=>{
          console.log(result.data);
          this.module_name = result.data[0].module_name;
          this.banner_src = result.data[0].module_src;
        })
      },
      async getContent(){
        await this.$axios.get("http://localhost/php/sfkbbs/before/all_content.php?id="+this.id).then(result=>{
          // console.log(result.data);
          this.content = result.data;
        })
      },
      async block(){
        await this.$axios.get("http://localhost/php/sfkbbs/before/all_article.php?id="+this.id).then(result=>{
          console.log(result.data);
          this.article = result.data;
        })
      }
    }
  }
</script>

<style scoped>
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
    margin-top: 30px;
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
  .module_message{
    display: flex;
    flex-wrap: wrap;
  }
  .module_message span{
    width: 100%;
  }
</style>
