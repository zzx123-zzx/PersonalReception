<template>
  <!-- 推荐文章组件 -->
  <div class="Recommended">
    <div style="border-bottom: 1px solid #90EE90;text-align: left;">
      <i class="el-icon-edit-outline">推荐文章</i>
    </div>
    <div class="location">
        <a
        :href=localtions.article_url v-for="localtions in recommend_data"
        style="text-align: left;"
        >
          <i class="el-icon-location">{{localtions.article_title}}...</i>
        </a>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        recommend_data:[]        //推荐文章
      }
    },
    async created(){
      this.recommend()
    },
    methods:{
      async recommend(){
        await this.$axios.get("admin/recommend.php").then(result=>{
          this.recommend_data = result.data;
        })
      },
    }
  }
</script>

<style scoped>
  .Recommended a {
    width: 100%;
    text-align: left;
  }
</style>
