<template>
  <div
    v-loading = "loading"
    element-loading-text="加载中"
  >
    <div class="container">
      <div class="son_module">
        <div v-for="sonItem in sonModule" class="box">
            <div class="content">
              <img :src="sonItem.module_src" width="100" height="100">
                <div class="module_message">
                  <span><i class="el-icon-s-home"></i>部落:{{sonItem.module_name}}</span>
                  <span><i class="el-icon-s-order"></i>简介:{{sonItem.info}}</span>
                  <span>
                    <i class="el-icon-location"></i>
                    <router-link :to="'/content/'+sonItem.id">
                      前往相关部落-->
                    </router-link>
                  </span>
                </div>
             </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    inject:['routerRefresh'],
    data(){
      return {
        fatherModule:[],
        fatherId:[],
        sonModule:[],
        show:false,
        aaa:'2222',
        count:0,
        id:this.$route.params.id,
        loading:true
      }
    },
    async created(){
      // this.getAllFatherModule(),
      this.getAllSonModule()
    },
    methods:{
      load (){
        this.count += 2;
      },
      //获取所有父板块
      async getAllFatherModule(){
        await this.$axios.get("index/getFatherModule.php").then(result=>{
          this.fatherModule = result.data;
        })
      },
      async getAllSonModule(){
        await this.$axios.get("index/getSonModule.php?id="+this.id).then(result=>{
          // console.log(result.data);
          this.sonModule = result.data;
          this.loading = false;
        })
      }
    },
    watch:{

    }
  }
</script>

<style scoped lang="less">
  a{
    /* color: red; */
    color: #13CE66;
    text-decoration: none;
    font-size: 1em;
  }
  .container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: 隶书;
    font-weight: 1000;
  }
  .son_module{
    width: 100%;
    height: 100%;
    /* height: 70vh; */
    /* min-height:70vh; */
    display: flex;
    /* justify-content: center;
    flex-wrap: wrap; */
    align-content: flex-start;
     flex-flow: row wrap;
  }
  .box{
    width: 100%;
    border-bottom: 1px solid #CCCCCC;
    /* font-size: 2em; */
    height: 20%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .box span {
    width: 100%;
  }
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content img{
    border-radius: 50%;

  }
  .module_message{
    display: flex;
    flex-flow: row wrap;
  }
  .module_message span{
    font-size: 20px;
    @media screen and (max-width:500px){
      font-size: 0.8em;
    }
  }
  .Header{
    height: 10vh;
    background-color: white;
    display: flex;

  }
  .Header li{
    flex: 1;
    text-align: center;
    list-style: none;
    line-height: 1.5em;
    font-size: 1.5em;
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
</style>
