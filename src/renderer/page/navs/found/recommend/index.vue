<template>
    <div>
        <v-banner></v-banner>
        <div v-for="(item,index) in array">
            <component :is="item.com"></component>
        </div>
        <v-tabs></v-tabs>
    </div>
</template>

<script>
    import banner from './banner'
    import personalized from './personalized'
    import privatecontent from './exclusive'
    import newsong from './newmuisc'
    import mv from './mv'
    import station from './station'
    import tabs from './tabs'
    import { mapState } from 'vuex'
    export default {
        name: "recommend",
        computed: {
            ...mapState([
                'array'
            ]),
        },
        components:{
            "v-banner":banner,
            "v-personalized":personalized,
            "v-privatecontent":privatecontent,
            "v-newsong":newsong,
            "v-mv":mv,
            "v-station":station,
            "v-tabs":tabs
        }
    }
</script>

<style scoped>

</style>