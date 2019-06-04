<template>
  <div id="app">
    <v-header></v-header>
    <!--<v-navs></v-navs>-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header'
  import navs from './page/navs'
  import {mapActions} from 'vuex'
  export default {
    name: 'cloudmusic',
    components:{
      "v-header":header,
      "v-navs":navs
    },
    methods:{
      ...mapActions([
        'getUserInfo'
      ]),
    },
    computed: {
      id() {
        return this.$store.state.id;
      }
    },
    created(){
      if(this.id){
        this.getUserInfo(this.id)
      }
      this.$setgoindex()
    }
  }
</script>

<style>
  /* CSS */
</style>
