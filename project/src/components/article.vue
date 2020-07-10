<template>
  <div>
    <div class="container">
      <!-- 头部组件 -->
      <topHeader :active_id="form.id"></topHeader>
      <!-- 头部组件结束 -->

      <!-- 主盒子 -->
       <div class="bodys">
         <div class="category">
           <div class="link">
              <div style="border-bottom: 5px solid #90EE90;">博主:{{author}}</div>
              <!-- 作者信息 -->
              <div class="author_info">
                <div class="author_info_title">
                  <span>发表总量</span>
                  <span>qq</span>
                  <span>电话</span>
                  <span>粉丝</span>
                </div>
                <!-- 作者信息对应内容 -->
                <div class="author_info_content">
                  <span>{{author_number}}</span>
                  <span>22</span>
                  <span>33</span>
                  <span>40</span>
                </div>
              </div>
              <div><img src="../../static/author.jpg" width="100%"/></div>
              <div><img src="../../static/swiper1.jpg" width="100%"></div>
           </div>
         </div>
         <div class="blank"></div>
         <div class="arltce">
           <div class="content" v-for="artice_item in article">
             <div class="content_title" style="background-color:#CCCCCC;"> {{artice_item.title}}</div>
             <div class="text_body">
               <span style="width: 100%;text-align: center;">
                 <img :src="artice_item.title_src" width="80%" height="300px"/></span>
                 <span>{{artice_item.content}}
               </span>
             </div>
             <div class="reply">
               <input type="text" v-model="form.reply" style="height: 50px; border-radius: 15px; width: 80%;" />
               <button value="回复" @click="huifu()" class="replyButton">发表评论</button>
             </div>
             <div class="reply_content" v-for="allRegply_msg in allRegply">
               <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                 <div><span style="color: blue; font-weight: 1000">{{allRegply_msg.name}}:</span><span>{{allRegply_msg.content}}</span></div>
                 <div>
                    <button @click="Div(allRegply_msg.id)">引用回复</button>
                 </div>
               </div>
                <!-- v-if 如果父评论的id等于子评论的queto_id 那就显示 -->
                <!-- 显示所有回复内容 开始 -->
               <div v-for="sonRegply in yinyong" v-if="allRegply_msg.id==sonRegply.queto_id" style="margin-left: 20px;">
                    <div style="display: flex;"><span style="color: red; font-weight: 1000">{{sonRegply.name}}</span>:{{sonRegply.content}}回复:
                      <div v-for="allRegply_msg in allRegply" v-if="sonRegply.queto_id==allRegply_msg.id">
                        <span style="color: blue; font-weight: 1000;">{{allRegply_msg.name}}</span>:{{allRegply_msg.content}}
                      </div>
                    </div>
               </div>
               <!-- 显示所有回复内容结束 -->
             </div>
             <!-- 引用回复的输入框 开始 -->
             <div v-if="styles">
                    <input type="text" v-model="form.quoteReply"/>
                    <input type="button" value="立即回复" @click="quote(quote_id)"/>
             </div>
             <!-- 引用回复输入框 结束 -->
           </div>
         </div>
       </div>
     </div>
     <!-- 主盒子结束 -->
     <div class="footer"></div>
  </div>
</template>

<script>
  import topHeader from './header.vue';
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        form:{
          content:[],
          username:'',
          reply:'',
          member_id:'',
          id:this.$route.params.id,
          quoteReply:''                //你输入的引用回复的内容
        },
        allRegply:[],                  //父评论
        yinyong:[],                    //引用评论
        styles:false,
        quote_id:'',                //每一条父评论的id
        article:[],
        src:'',                     //图片路径
        statue:''                   ,//状态码，如果评论成功，这里就会有数据变化，然后watch监听这个
        author_id:'',
        author:'',
        author_number:''          //此作者发布过的文章数量

      }
    },
    async created(){
      this.getArticle(),
      this.getAllReply(),
      this.yingyong()
    },
    methods:{
      Div(quote_id){
        this.styles = true;
        //此id是 allRegply 循环里面的每一条评论的id
        this.quote_id = quote_id;        //每一条回复的id，然后赋值给data里面的quote_id,方便quote方法回复使用
        // this.styles = false;
      },
      //引用回复方法
      async quote(quote_id){
        //判断用户有没有登录
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
           this.form.username = JSON.parse(sessionStorage.getItem('userInfo'));
           this.form.username = this.form.username[0].username;

           // 如果用户有登录，那就获取登录登录的用户名的id
           await this.$axios.get("http://localhost/php/sfkbbs/user/reply.php?username="+this.form.username).then(result=>{
             this.form.member_id = result.data;
           });
           //引用回复，根据传递过来的参数，判断是引用谁的回复,每一个按钮都对应每一个回复的id
           await this.$axios.post("http://localhost/php/sfkbbs/user/yingyong.php",
           stringify({"quote_id":quote_id,"content_id":this.form.id,"content":this.form.quoteReply,"member_id":this.form.member_id,"name":this.form.username})).then(result=>{
              this.yingyong();
              this.styles = false;
           })
        }else{
          this.$router.push('/login/'+this.form.id);
        }
      },
      async yingyong(){
        await this.$axios.get("http://localhost/php/sfkbbs/user/yingyong.php?id="+this.form.id).then(resulta=>{
          this.yinyong = resulta.data;
        })
      },
      //获取所有父评论
      async getAllReply(){
        await this.$axios.get("http://localhost/php/sfkbbs/user/allRegply.php?id="+this.form.id).then(result=>{
          this.allRegply = result.data;
        })
      },

      //获取对应的文章
      async getArticle(){
        await this.$axios.get("http://localhost/php/sfkbbs/user/article.php?id="+this.form.id).then(result=>{
          this.article = result.data;
          this.author_id = result.data[0].member_id;
        })
        .then(async ()=>{
          await this.$axios.get("http://localhost/php/sfkbbs/index/getAuthor.php?id="+this.author_id).then(result=>{
            let [author] = result.data;
            this.author = author.name;
            this.author_number = result.data.length;  
            console.log(result.data);
          })
        })
      },
      //父评论
      async huifu(){
        var that = this;
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
           this.form.username = JSON.parse(sessionStorage.getItem('userInfo'));
           this.form.username = this.form.username[0].username;
          this.postContent();
        }else{
          this.$router.push('/login/'+this.form.id);
        }
      },
      async postContent(){
        //根据post过去的用户名名称拿到对应的用户id
        await this.$axios.get("http://localhost/php/sfkbbs/user/reply.php?username="+this.form.username).then(result=>{
          this.form.member_id = result.data;
        });
        await this.$axios.post("http://localhost/php/sfkbbs/user/reply.php",stringify(this.form)).then(result=>{
          this.statue = result.data;

        })
      }
    },
    components:{
      topHeader
    },
    watch:{
      statue(){
        this.getAllReply()
      }
    }
  }
</script>

<style scoped>
*{margin: 0;padding: 0;}

  .linkActiveClassStyle{
    background-color: #3A8EE6;
    text-decoration: none;
  }

  .container{
    width: 100%;
    height: 100%;
    background-color: #f5f6f7;
    font-family:"黑体"
  }

  .module{
    width: 100%;
  }

  .link{
    width: 100%;
    font-size: 2em;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
  }

  .link div{
    margin-top: 2em;
  }

  a{
    text-decoration: none
  }
  .category{
    width: 20%;
    background-color: white
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
    min-height: 100vh;
  }
  .blank{
    width: 15px;
  }
  .content_title{
    height: 100px;
    background-color: black;
    display: flex;
    align-items: center;
    color: white;
  }
  .text_body{
    /* height: 100vh; */
    min-height:100vh;
    background-color: #f5f6f7;
    display: flex;
    flex-flow: row wrap;
    font-size: 1.5em
   }
  .footer{
    height: 10vh;
    background-color: black;
  }
  .reply{
    width: 100%;
   background-color: #C0C4CC;
    margin-top: 20px;
  }
  .reply_content{
    width: 100%;
  }
  .replyButton{
    background-color: #3A8EE6;
    width: 100px;
    height: 50px;
    border-radius: 15px;
    font-weight: 1000;
    font-size: 1em;
    color: #90EE90;
  }

  .author_info_title{
    display: flex;
    font-size: 1rem;
  }
  .author_info_title span{
    flex: 1;
    text-align: center;
  }
  .author_info_content{
    display: flex;
    font-size: 1rem;
  }
  .author_info_content span{
    flex: 1;
    text-align: center;
  }
</style>
