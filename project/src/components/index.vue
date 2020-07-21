<template>
  <div style="margin: 0; padding: 0;">
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
     </div>
     </div>
   <div class="container">
      <div class="bodys">
        <div class="category">
          <div v-for="item in fatherModule" :key="item.id" class="link">
            <router-link :to="{ name: 'index_article', params: {id:item.id} }">
             &nbsp&nbsp&nbsp&nbsp&nbsp{{item.module_name}}&nbsp&nbsp&nbsp&nbsp
            </router-link>
          </div>
        </div>
        <div class="blank"></div>
        <div class="arltce">
          <div class="content">
            <el-carousel indicator-position="outside">

                <el-carousel-item v-for="item in banner_srcs" :key="item.id">
                  <!-- {{item.banner_src}} -->

                  <img :src = "item.banner_src" />
                  <!-- <img src="../../static/1595053985_700265994.jpg"/> -->
                </el-carousel-item>
            </el-carousel>

            <!-- 控制显示不同view -->
            <router-view :key="key"></router-view>
          </div>
        </div>
        <div class="blank"></div>
        <div class="blank"></div>
        <!-- 网站简介 -->
        <div class="infoBox">
          <div class="infoBoxTitle">网站简介</div>
          本站是一个讨论各类兴趣话题的聚集地,体育运动,电子竞技,学习探讨,都可以在这里探索您想要的!
        </div>
        <!-- 简介结束 -->
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        fatherModule:[],
        fatherId:[],
        sonModule:[],
        show:false,
        aaa:'2222',
        count:0,
        banner_srcs:[]     //banner图片路径
      }
    },
    async created(){
      this.getBanner(),
      this.getAllFatherModule()
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
        await this.$axios.get("http://localhost/php/sfkbbs/index/getFatherModule.php").then(result=>{
          this.fatherModule = result.data;
          // for(var i =0; i<this.fatherModule.length;i++){
          //   // console.log(this.fatherModule[i].id);
          //   this.fatherId.push(this.fatherModule[i].id);
          //   // console.log(this.fatherId);
          // }
        })
      },
      async getAllSonModule(){
        await this.$axios.post("http://localhost/php/sfkbbs/index/getSonModule.php").then(result=>{
          // console.log(result.data);
          this.sonModule = result.data;
          // console.log(this.fatherId);
        })
      },

      //获取轮播图数据
      async getBanner(){
         await this.$axios.get("http://localhost/php/sfkbbs/admin/banner.php").then(result=>{
            this.banner_srcs = result.data;
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

<style scoped>
 *{margin: 0;padding: 0;}
 /* .router-link-active{
    background: blue;
    width: 200px;
  } */

  .infoBox{
    width: 10%;
    height: 200px;
    border: 5px solid #90EE90;
    border-radius: 15px;
    box-shadow: #90EE90 30px 15px;
    margin-top: 3%;
    /* box-shadow: darkgrey 0px 0px 30px 5px inset */
  }
  .infoBoxTitle{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
  }
  .linkActiveClassStyle{
    background-color: #3A8EE6;
    text-decoration: none;
  }
  .container{
    width: 100%;
    height: 100%;
    background-color: #f5f6f7;
  }
  .module{
    width: 100%;
  }
  .Header{
    height: 10vh;
    background-color: white;
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
    background-color: white;
  }
  .arltce{
    width: 70%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
    height: 100%;
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
