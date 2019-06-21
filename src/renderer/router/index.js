import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/navs"
    },
    {
      path:'/navs',
      name:"navs",
      redirect:'/navs/found',
      component: resolve => require(['@/page/navs'],resolve),
      children:[
        {
          path:"/navs/found",
          name:"found",
          redirect:'/navs/found/recommend',
          component: resolve => require(['@/page/navs/found'],resolve),
          children:[
            {
              path:"/navs/found/recommend",
              name:"recommend",
              component: resolve => require(['@/page/navs/found/recommend'],resolve),
            },
            {
              path:"/navs/found/playlist",
              name:"playlist",
              component: resolve => require(['@/page/navs/found/playlist'],resolve),
            },
            {
              path:"/navs/found/station",
              name:"station",
              component: resolve => require(['@/page/navs/found/station'],resolve),
            },
            {
              path:"/navs/found/latestmusic",
              name:"latestmusic",
              component: resolve => require(['@/page/navs/found/latestmusic'],resolve),
            },
            {
              path:"/navs/found/singer",
              name:"singer",
              component: resolve => require(['@/page/navs/found/singer'],resolve),
            },
            {
              path:"/navs/found/list",
              name:"singer",
              component: resolve => require(['@/page/navs/found/list'],resolve),
            }
          ]
        },
        {
          path:"/navs/fm",
          name:"found",
          component: resolve => require(['@/page/navs/fm'],resolve),
        },
        {
          path:"/navs/myMusic",
          name:"myMusic",
          component: resolve => require(['@/page/navs/myMusic'],resolve),
        },
        {
          path:'/navs/user',
          name:'user',
          component: resolve => require(['@/page/navs/user'],resolve),
        },
        {
          path:'/navs/searchCont',
          name:'search',
          component: resolve => require(['@/page/navs/searchCont'],resolve),
        }
      ]
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
