
<template>
    <div class="search-tab" style="padding: 0">
        <ul class="tab-menu">
            <li v-for="(item,index) in tab" @click="fnIndex(index,item.components)" class="music-li" :class="[{active:index === flag}]">
                {{item.name}}
            </li>
        </ul>
        <keep-alive>
            <component :is="nameC" class="tabs_content" :name="keywords"></component>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    import song from './songs'
    import singer from './singer'
    import vidoer from './vidoer'
    import user from './users'
    export default {
        name: "index",
        data(){
            return{
                keywords:this.$route.query.name,
                tab:[
                    {"name":"单曲","components":'song'},
                    {"name":"歌手","components":'singer'},
                    {"name":"视频","components":'vidoer'},
                    {"name":"用户","components":'user'}
                ],
                nameC:'v-song',
                flag:0,
            }
        },
        methods:{
            fnIndex(index,data){
                this.flag = index;
                this.nameC = `v-${data}`;
            },
        },
        components:{
            "v-song":song,
            "v-vidoer":vidoer,
            "v-singer":singer,
            "v-user":user
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .search-tab{
        .tab-menu{
            border-bottom: 1px solid #232529;
            padding-bottom: 10px;
        }
        .music-li{
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            width: 120px;
            text-align: center;
            padding-top: 40px;
            color: #fff;
            position: relative;
            &.active{
                color: #B82525;
                &:after{
                    position: absolute;
                    content: "";
                    width: 50%;
                    height: 5px;
                    background: #B82525;
                    left: 0;
                    margin-left: 25%;
                    bottom: -10px;
                }
            }
        }
    }
</style>