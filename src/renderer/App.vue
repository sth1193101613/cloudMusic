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
  import {mapActions} from 'vuex'
  import {createdData} from './util'
  export default {
    name: 'cloudmusic',
    components:{
      "v-header":header,
      "v-navs":navs
    },
    mounted(){
      createdData()
    },
    watch:{
      '$route'(val,k){
        window.scrollTo(0,0);
      }
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
      // if(this.id){
      //   this.getUserInfo(this.id)
      // }
      this.$setgoindex()
    }
  }
</script>

<style>
  /* CSS */
</style>
