<template>
    <div>
        <v-banner></v-banner>
        <v-personalized></v-personalized>
    </div>
</template>

<script>
    import banner from './banner'
    import personalized from './personalized'
    export default {
        name: "recommend",
        components:{
            "v-banner":banner,
            "v-personalized":personalized
        }
    }
</script>

<style scoped>

</style>