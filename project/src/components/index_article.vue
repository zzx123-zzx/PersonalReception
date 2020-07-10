<template>
  <div>
    <!-- <div class="fatherModuleBox" v-for="item in fatherModule" :key="item.id">
      <div class="fatherModuleTitle">
        <router-link :to="'/content/'+item.id">父版块:{{item.module_name}}</router-link>
      </div>
      <div class="sonModuleBox" v-for="sonItem in sonModule" v-if="sonItem.father_module_id==item.id">
        {{sonItem.module_name}}
      </div>
    </div> -->
    <div class="container">
      <div class="son_module">
        <div v-for="sonItem in sonModule" class="box">
            <div class="content">
              <img :src="sonItem.module_src" width="100" height="100">
                <div class="module_message">
                  <span>专属部落:{{sonItem.module_name}}</span>
                  <span>部落简介:{{sonItem.info}}</span>
                  <router-link :to="'/content/'+sonItem.id">点击此处,前往部落</router-link>
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
        id:this.$route.params.id
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
        await this.$axios.get("http://localhost/php/sfkbbs/index/getFatherModule.php").then(result=>{
          this.fatherModule = result.data;
        })
      },
      async getAllSonModule(){
        await this.$axios.get("http://localhost/php/sfkbbs/index/getSonModule.php?id="+this.id).then(result=>{
          // console.log(result.data);
          this.sonModule = result.data;
          console.log(this.sonModule);
          // console.log(this.fatherId);
        })
      }
    },
    watch:{

    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    /* background-color: red; */
    justify-content: space-between;
  }
  .son_module{
    width: 100%;
    height: 70vh;
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
  .module_message{
    display: flex;
    flex-flow: row wrap;
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
