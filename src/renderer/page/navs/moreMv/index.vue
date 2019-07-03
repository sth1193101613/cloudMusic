<template>
    <div class="mv-tab">
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
    import mvlist from './mvlist'
    import videolist from './videolist'
    export default {
        name: "index",
        data(){
            return{
                flag:0,
                name:'v-videolist',
                tab:[
                    {"name":"视频","components":'videolist'},
                    {"name":"MV","components":'mvlist'}
                ]
            }
        },
        methods:{
            fnIndex(index,data){
                this.flag = index;
                this.name = `v-${data}`;
            },
        },
        components:{
            "v-mvlist":mvlist,
            "v-videolist":videolist
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mv-tab{
        .tab-menu{
            display: flex;
            align-items: center;
            line-height: 3;
            border-bottom: 1px solid #202226;
            justify-content: center;
            li{
                text-align: center;
                cursor: pointer;
                font-size: 14px;
                width: 85px;
                &.active{
                    color: #fff;
                    border-bottom: 2px solid  #5C5E61;
                }
            }
        }
    }
</style>