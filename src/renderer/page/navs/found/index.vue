<template>
    <div>
        <div class="tabs">
            <ul class="tab-cont">
                <router-link v-for="(item,index) in tab" tag="li" :to="item.path" class="item">
                    {{item.name}}
                </router-link>
            </ul>
        </div>
        <keep-alive>
            <router-view class="content"></router-view>
        </keep-alive>
    </div>
</template>

<script>

    export default {
        name: "index",
        data(){
            return{
                tab:[{"name":"个性推荐","path":"/navs/found/recommend"},
                    {"name":"歌单","path":"/navs/found/playlist"},
                    {"name":"主播电台","path":"/navs/found/station"},
                    {"name":"排行榜","path":"/navs/found/latestmusic"},
                    {"name":"歌手","path":"/navs/found/singer"},
                    {"name":"最新音乐","path":"/navs/found/list"}]
            }
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .tabs{
        .tab-cont{
            display: flex;
            align-items: center;
            line-height: 3;
            border-bottom: 1px solid #4a4a4a;
            justify-content: center;
        }
        .item{
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            width: 85px;
            &.router-link-active{
                color: #fff;
                border-bottom: 2px solid #9e9e9e;
            }
        }
    }
    .content{
        max-width: 1024px;
        margin: 0 auto;
    }
</style>