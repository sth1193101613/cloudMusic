import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/style.css'
import './assets/css/style.less'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css';
import './util'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import'vue-video-player/src/custom-theme.css'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading: require('./assets/images/load.gif')
})

Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
