import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login  from '@/components/login'
import content from '@/components/content'
import article from '@/components/article'
import index_article from '@/components/index_article'
import indexCba from '@/components/indexCba'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path:'index_article/:id',
          name:'index_article',
          component:index_article
        }
      ]
    },
    {
      path:'/content/:id',
      name:'content',
      component:content
    },
    {
      path:'/login/:id',
      name:'login',
      component:login
    },
    {
      path:'/article/:id',
      name:'article',
      component:article
    }
  ],
  linkActiveClass:'linkActiveClassStyle'
})
