<template>
    <div>
        <v-banner></v-banner>
        <v-tag></v-tag>
        <v-gift></v-gift>
        <v-erci></v-erci>
    </div>
</template>

<script>
    import banner from './banner'
    import tag from './tag'
    import gift from './gift'
    import erci from './two'
    export default {
        name: "index",
        components:{
            "v-banner":banner,
            "v-tag":tag,
            "v-gift":gift,
            "v-erci":erci
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>