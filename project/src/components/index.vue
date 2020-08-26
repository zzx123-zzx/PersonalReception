<template>
  <div style="margin: 0; padding: 0;"
      v-loading = "loading"
      element-loading-text="拼命加载中"
      element-loading-background = "rgba(255,255,255,1)"
  >
    <!--<div class="fatherModuleBox" v-for="item in fatherModule" :key="item.id">
      <div class="fatherModuleTitle">
        <router-link :to="'/content/'+item.id">父版块:{{item.module_name}}</router-link>
      </div>
       v-if很关键，这样就可以显示出对应的父板块对应的子版块了
      <div class="sonModuleBox" v-for="sonItem in sonModule" v-if="sonItem.father_module_id==item.id">
        {{sonItem.module_name}}
      </div>
    </div> -->
    <div class="Header">
     <div class="logoContainer">
       <div class="logo">
         <img src="../assets/logo.png">
       </div>
       <span class="connect_our"><i class="el-icon-phone-outline"></i>联系我们</span>
     </div>
     <span class="WebTitle">阿贤个人网</span>
    </div>
   <div class="container">
     <div style="background-color: #CCCCCC;"></div>
      <div class="bodys">
        <div class="category">
          <div v-for="item in fatherModule" :key="item.id" class="link">
            <router-link :to="{ name: 'index_article', params: {id:item.id} }" style="width: 100%;">
              {{item.module_name}}
            </router-link>
          </div>
        </div>
        <div class="blank"></div>
        <div class="arltce">
          <div class="content">
            <div style="display: flex;justify-content: space-between;">
              <el-carousel indicator-position="outside" class="swipers">
                  <el-carousel-item v-for="item in banner_srcs" :key="item.id">
                    <img :src = "item.banner_src"/>
                  </el-carousel-item>
              </el-carousel>
              <div class="infoBox">
                  <span>
                    <p style="font-size: 1.5em;"><i class="el-icon-info">网站简介 Web info</i></p>
                    <p>本站是一个讨论各类兴趣话题的聚集地,体育运动,电子竞技,学习探讨,都可以在这里探索您想要的!</p>
                    <p>This site is a gathering place to discuss all kinds of interesting topics, sports, e-sports, learning and discussion, you can explore what you want here!</p>
                  </span>
                  <span>
                    <p><i class="el-icon-s-home">部落总数:</i> {{module_length}}</p>
                  </span>
                  <span>
                    <p><i class="el-icon-s-data">文章总数:</i> {{article_length}}</p>
                  </span>
                  <span>
                    <p><i class="el-icon-s-custom">站长微信:</i> 1127564950</p>
                  </span>
              </div>
            </div>
            <!-- 控制显示不同view -->
            <router-view :key="key"></router-view>
          </div>
        </div>
        <div class="blank"></div>
        <div class="blank"></div>
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
  import banner_js from '../mixin/banner.js';  //封装了一个轮播图的方法，在mixins引入
  export default{
    data(){
      return {
        loading:true,
        fatherModule:[],
        fatherId:[],
        sonModule:[],
        show:false,
        aaa:'2222',
        count:0,
        module_length:'',  //部落总数
        article_length:'' //文章总数
      }
    },
    mixins:[banner_js],
    async created(){
      this.getBanner(),
      this.getAllFatherModule(),
      this.getModuleLength()
    },
    provide(){
        return {
          routerRefresh: this.routerRefresh
       }
    },
    methods:{
      load (){
        this.count += 2;
      },
      //获取所有父板块
      async getAllFatherModule(){
        //http://localhost/php/sfkbbs/index/getFatherModule.php
        await this.$axios.get("index/getFatherModule.php").then(result=>{
          this.fatherModule = result.data;
        })
      },
      async getAllSonModule(){
        //http://localhost/php/sfkbbs/index/getSonModule.php
        await this.$axios.post("index/getSonModule.php").then(result=>{
          // console.log(result.data);
          this.sonModule = result.data;
          // console.log(this.fatherId);
        })
      },
      //获取轮播图数据
      // async getBanner(){
      //   //http://localhost/php/sfkbbs/admin/banner.php
      //    await this.$axios.get("admin/banner.php").then(result=>{
      //       this.banner_srcs = result.data;
      //       this.loading = false;
      //    })
      // },

      //获取文章和部落总数
      async getModuleLength(){
        await this.$axios.get("before/module_length.php").then(result=>{
           this.module_length = result.data;
        })
        await this.$axios.get("before/article_length.php").then(result=>{
          this.article_length = result.data;
        })
      }
    },
    watch:{

    },
    computed:{
      //控制页面跳转显示对应的routr-view
    	key(){
    	    return this.$route.path;
    	}
    }
  }
</script>

<style scoped lang="less">
 *{margin: 0;padding: 0;}
 /* .router-link-active{
    background: blue;
    width: 200px;
  } */
  .infoBox{
      width: 30%;
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #CCCCCC;
      color: #13CE66;
      font-weight: 1000;
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);
      @media screen and (max-width:500px){
        display: none;
        width: 0;
      }
  }
  .infoBox span{
    width: 100%;
    /* text-shadow: 2px 2px 2px #CCCCCC; */
  }
  .infoBox i{
    color: #000000;
    font-weight: bold;
  }
  .infoBoxTitle{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
  }
  .linkActiveClassStyle{
    background-color: #90EE90;
    text-decoration: none;
  }
  .container{
    width: 100%;
    height: 100%;
    background-color: #CCCCCC;
    overflow: hidden;
    @media screen and (max-width:500px){
      display: flex;
      justify-content: space-between;
    }
  }
  .module{
    width: 100%;
  }
  .Header{
    height: 10vh;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    // @media screen and (max-width:500px){
    //   background-color: red;
    // }
  }
  .link{
    width: 100%;
    font-size: 2em;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
  }
  a{
    text-decoration: none;
  }
  .category{
    width: 10%;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    @media screen and (max-width:500px){
      width: 20%;
      margin-left: 3%;
      margin-top: 0;
      // margin-top: ;
    }
  }
  .category a{
    /* width: 1000px; */
    display:block;
  }
  .arltce{
    width: 70%;
    min-height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);
    @media screen and (max-width:500px){
      min-height: 80vh;
      min-width: 70%;
      margin-top: 0;
    }
  }
  .content{
    width: 90%;
  }
  .content_title{
    width: 100%;
    font-size: 2em;
  }
  .content_body{
    width: 100%;
    font-size: 1em;
  }
  .bodys{
    min-height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .blank{
    width: 15px;
  }
  .banner{
    height: 300px;
    background-color: pink;
  }
  .footer{
    height: 10vh;
    background-color: black;
  }
    .el-carousel__item img{
      height: 300px;
      width: 100%;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
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
    .connect_our{
      float: right;
      display: flex;
      height: 10vh;
      font-size: 1.5em;
      font-family: "arial black";
      font-weight: 1000;
      /* color: royalblue; */
      align-items: flex-end;
      color: #13CE66;
    }

    .swipers{
      width: 65%;
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);
      @media screen and (max-width:500px){
        width: 100%;
        height: 30vh;
        overflow: hidden;
      }
    }
    .swipers img{
      width: 100%;
      height: 100%;
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
      @media screen and (max-width:500px){
        display: none;
      }
    }
  .fatherModuleBox{
    background-color: lightblue;
    display: flex;
    flex-wrap: wrap;
  }
  .fatherModuleTitle{
    width: 100%;
    height: 50px;
  }
  .sonModuleBox{
    height: 200px;
    width: 200px;
    background-color: deeppink;
  }
</style>
