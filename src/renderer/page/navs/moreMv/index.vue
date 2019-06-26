<template>
    <div class="music-tab">
        <ul class="tab-menu">
            <li v-for="(item,index) in tab" @click="fnIndex(index,item.components)" class="music-li" :class="[{active:index === flag}]">
                {{item.name}}
            </li>
        </ul>
        <keep-alive>
            <component :is="name" class="tabs_content"></component>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "index",
        data(){
            return{
                tab:[
                    {"name":"视频","components":'videolist'},
                    {"name":"MV","components":'mvlist'}
                ]
            }
        },
        components:{
            
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>