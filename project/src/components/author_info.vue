<template>
  <!-- 左侧作者信息组件 -->
  <div class="link">
    <div style="border-bottom: 1px solid #90EE90;text-align: left;">
      <i class="el-icon-s-custom"></i>博主:{{author}}
    </div>
    <!-- 作者信息 -->
    <div class="author_info">
      <div class="author_info_title">
        <span><i class="el-icon-s-data"></i>文章</span>
        <span><i class="el-icon-user-solid"></i>qq</span>
        <span><i class="el-icon-chat-dot-square">评论</i></span>
        <span><i class="el-icon-star-on"></i>粉丝</span>
      </div>
      <!-- 作者信息对应内容 -->
      <div class="author_info_content">
        <span>{{author_number}}</span>
        <span>22</span>
        <span>33</span>
        <span>40</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        author_number: '', //此作者发布过的文章数量
        author:'',
        author_id:''
      }
    },
    async created(){
      this.getArticle()
    },
    props:[
      'active_id'    //父组件传递过来的当前文章id，通过这个id可以获取到作者是谁，还有作者文章数量
    ],
    methods:{
      //获取对应的文章
      async getArticle() {
        console.log(this.active_id);
        await this.$axios.get("user/article.php?id=" + this.active_id).then(result => {
            this.article = result.data;
            this.author_id = result.data[0].member_id;
        })
          .then(async () => {
            await this.$axios.get("index/getAuthor.php?id=" + this.author_id).then(
              result => {
                let [author] = result.data;
                this.author = author.name;
                this.author_number = result.data.length;
                // console.log(result.data);
              })
          })
      }
    }
  }
</script>

<style scoped>
.author_info_title {
    display: flex;
    font-size: 1rem;
    width: 100%;
  }

  .author_info_title span {
    flex: 1;
    text-align: center;
  }

  .author_info_content {
    display: flex;
    font-size: 1rem;
  }

  .author_info_content span {
    flex: 1;
    text-align: center;
  }
  .link div{
    margin-top: 1em;
  }
</style>
