<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header'
  export default {
    name: 'cloudmusic',
    components:{
      "v-header":header
    }
  }
</script>

<style>
  /* CSS */
</style>
