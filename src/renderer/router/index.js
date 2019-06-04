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
      component: require('@/page/navs').default,
      children:[
        {
          path:"/navs/found",
          name:"found",
          redirect:'/navs/found/recommend',
          component: require('@/page/navs/found').default,
          children:[
            {
              path:"/navs/found/recommend",
              name:"recommend",
              component: require('@/page/navs/found/recommend').default,
            },
            {
              path:"/navs/found/playlist",
              name:"playlist",
              component: require('@/page/navs/found/playlist').default,
            },
            {
              path:"/navs/found/station",
              name:"station",
              component: require('@/page/navs/found/station').default,
            },
            {
              path:"/navs/found/latestmusic",
              name:"latestmusic",
              component: require('@/page/navs/found/latestmusic').default,
            },
            {
              path:"/navs/found/singer",
              name:"singer",
              component: require('@/page/navs/found/singer').default,
            },
            {
              path:"/navs/found/list",
              name:"singer",
              component: require('@/page/navs/found/list').default,
            }
          ]
        },
        {
          path:"/navs/fm",
          name:"found",
          // redirect:'/navs/found/recommend',
          component: require('@/page/navs/fm').default,
        }
      ]
    }
  ]
})
