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
