let mixin = {
  data(){
    return {
      banner_srcs:[],
      loading : true
    }
  },
  methods:{
    async getBanner(){
      //http://localhost/php/sfkbbs/admin/banner.php
       await this.$axios.get("admin/banner.php").then(result=>{
          this.banner_srcs = result.data;
          this.loading = false;
       })
    }
  }
}

export default mixin;
