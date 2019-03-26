<template>
  <div id="app">
    <v-header></v-header>
    <!--<v-navs></v-navs>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header'
  import navs from './page/navs'
  export default {
    name: 'cloudmusic',
    components:{
      "v-header":header,
      "v-navs":navs
    },
    watch: {
      $route(to,from){
        console.log(this.$router);
      }
    },
    created(){
      this.$setgoindex()
    }
  }
</script>

<style>
  /* CSS */
</style>
