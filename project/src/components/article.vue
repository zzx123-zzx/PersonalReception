<template>
  <div v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255,255,255,1)">
    <div class="container">
      <!-- 头部组件 -->
      <topHeader :active_id="form.id"></topHeader>
      <!-- 头部组件结束 -->

      <!-- 主盒子 -->
      <div class="bodys">
        <div class="category">
          <div class="link">
            <authorInfo :active_id="form.id"></authorInfo>
            <el-carousel indicator-position="outside" style="overflow: hidden;">
              <el-carousel-item v-for="item in banner_srcs" :key="item.id" style="height: 300px;">
                <img :src = "item.banner_src" height="100%" width="100%"/>
              </el-carousel-item>
            </el-carousel>
            <!-- 推荐文章 -->
            <recommend></recommend>
            <!-- 推荐文章结束 -->
          </div>
        </div>
        <div class="blank"></div>
        <div class="arltce">
          <div class="content" v-for="artice_item in article">
            <div class="content_title" style="background-color: #90EE90"> {{artice_item.title}}</div>
            <div class="text_body">
              <span style="width: 100%;text-align: center;">
                <img :src="artice_item.title_src" width="80%" height="300px" /></span>
              <span>
                {{artice_item.content}}
              </span>
            </div>
            <div class="reply">
              <el-input style="width: 80%;" v-model="form.reply" placeholder="请输入内容"></el-input>
              <button value="回复" @click="huifu()" class="replyButton">发表评论</button>
            </div>
            <div class="reply_content" v-for="allRegply_msg in allRegply">
              <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <div><span style="color: blue; font-weight: 1000">{{allRegply_msg.name}}:</span><span>{{allRegply_msg.content}}</span></div>
                <div>
                  <!-- <el-button type="text" @click="Div(allRegply_msg.id)"><<< 引用回复</el-button> -->
                  <i class="el-icon-chat-dot-square" @click="Div(allRegply_msg.id)"></i>
                  <el-dialog title="回复内容" :visible.sync="dialogFormVisible">
                    <el-input v-model="form.quoteReply" autocomplete="off" style="width: 600px;"></el-input>
                    <el-button style="height:5vh;" type="primary" @click="quote(quote_id)">立即回复</el-button>
                  </el-dialog>
                  <!-- <button @click="Div(allRegply_msg.id)">引用回复</button> -->
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topHeader from './header.vue';
  import recommend from './recommend.vue';    //推荐文章组件
  import authorInfo from './author_info.vue';  //作者信息组件
  import banner_js from '../mixin/banner.js'; //获取轮播图的方法
  import {
    stringify
  } from 'querystring';
  export default {
    data() {
      return {
        form: {
          content: [],
          username: '',
          reply: '',
          member_id: '',
          id: this.$route.params.id,
          quoteReply: '' //你输入的引用回复的内容
        },
        loading: true,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        allRegply: [], //父评论
        yinyong: [], //引用评论
        styles: false,
        quote_id: '', //每一条父评论的id
        article: [],
        src: '', //图片路径
        statue: '' //状态码，如果评论成功，这里就会有数据变化，然后watch监听这个
      }
    },
    mixins:[banner_js],
    async created() {
      this.getArticle(),
        this.getAllReply(),
        this.yingyong(),
        this.getBanner()
    },
    methods: {
      Div(quote_id) {
        this.styles = true;
        this.dialogFormVisible = true; //element-ui 控制弹框
        //此id是 allRegply 循环里面的每一条评论的id
        this.quote_id = quote_id; //每一条回复的id，然后赋值给data里面的quote_id,方便quote方法回复使用
        // this.styles = false;
      },
      //获取所有文章
      async getArticle() {
        await this.$axios.get("user/article.php?id=" + this.form.id).then(result => {
          this.article = result.data;
        })
      },
      //引用回复方法
      async quote(quote_id) {
        //判断用户有没有登录
        if (JSON.parse(sessionStorage.getItem('userInfo'))) {
          this.form.username = JSON.parse(sessionStorage.getItem('userInfo'));
          this.form.username = this.form.username[0].username;

          // 如果用户有登录，那就获取登录登录的用户名的id
          await this.$axios.get("user/reply.php?username=" + this.form.username).then(
            result => {
              this.form.member_id = result.data;
            });
          //引用回复，根据传递过来的参数，判断是引用谁的回复,每一个按钮都对应每一个回复的id
          await this.$axios.post("user/yingyong.php",
            stringify({
              "quote_id": quote_id,
              "content_id": this.form.id,
              "content": this.form.quoteReply,
              "member_id": this.form.member_id,
              "name": this.form.username
            })).then(result => {
            this.yingyong(); //回复成功后，重新调用
            this.dialogFormVisible = false;
            this.form.quoteReply = '';
          })
        } else {
          this.$router.push('/login/' + this.form.id);
        }
      },
      //所有引用回复
      async yingyong() {
        await this.$axios.get("user/yingyong.php?id=" + this.form.id).then(resulta => {
          this.yinyong = resulta.data;
        })
      },
      //获取所有父评论
      async getAllReply() {
        await this.$axios.get("user/allRegply.php?id=" + this.form.id).then(result => {
          this.allRegply = result.data;
          this.loading = false;
        })
      },
      //父评论
      async huifu() {
        var that = this;
        if (JSON.parse(sessionStorage.getItem('userInfo'))) {
          this.form.username = JSON.parse(sessionStorage.getItem('userInfo'));
          this.form.username = this.form.username[0].username;
          this.postContent();
        } else {
          this.$router.push('/login/' + this.form.id);
        }
      },
      async postContent() {
        //根据post过去的用户名名称拿到对应的用户id
        await this.$axios.get("user/reply.php?username=" + this.form.username).then(
          result => {
            this.form.member_id = result.data;
          });
        await this.$axios.post("user/reply.php", stringify(this.form)).then(result => {
          this.statue = result.data;
        })
      },
      //获取推荐文
      link_recommend(url) {
        console.log(url);
        window.localtion.href = url;
        // location.href = url;
        // this.$router.push(url);
      },
      See(e) {
        this.$router.push(e);
        // window.location.href = e;
      }
    },
    components: {
      topHeader,
      recommend,
      authorInfo
    },
    watch: {
      statue() {
        this.getAllReply()
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .linkActiveClassStyle {
    background-color: #3A8EE6;
    text-decoration: none;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #CCCCCC;
    font-family: "黑体"
  }

  .module {
    width: 100%;
  }

  .link {
    width: 100%;
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
  }

  .link div {
    margin-top: 1em;
  }

  .link img {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  a {
    text-decoration: none;
    font-size: 0.7em;
  }

  .category {
    width: 20%;
    background-color: white;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.3);
  }

  .arltce {
    width: 60%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);
  }

  .content {
    width: 90%;
    margin-top: 30px;
  }

  .content_title {
    width: 100%;
    font-size: 2em;
  }

  .content_body {
    width: 100%;
    font-size: 1em;
  }

  .bodys {
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    min-height: 100vh;
  }

  .blank {
    width: 15px;
  }

  .content_title {
    height: 50px;
    background-color: black;
    display: flex;
    align-items: center;
    color: white;
  }

  .text_body {
    /* height: 100vh; */
    min-height: 100vh;
    background-color: #f5f6f7;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    font-size: 1.5em;
  }

  .text_body img {
    margin-top: 2%;
    margin-bottom: 2%;
  }

  .footer {
    height: 10vh;
    background-color: black;
  }

  .reply {
    width: 100%;
    background-color: #90EE90;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .reply_content {
    width: 100%;
    font-size: 1.3em;
  }

  .replyButton {
    width: 100px;
    height: 50px;
    border-radius: 15px;
    font-size: 1em;
  }

  .location {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
</style>
