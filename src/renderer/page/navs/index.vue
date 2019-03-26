<template>
    <div class="navs-tab">
        <div class="tab">
            <ul>
                <li v-for="(item,index) in list" class="group">
                    <h3>{{item.title}}</h3>
                    <router-link :to="group.path" tag="div" v-for="(group,index) in item.item" class="item" @click.native="toggle(index)">
                        <div class="red" v-if="Index === index"></div>
                        <i class="fa" aria-hidden="true" :class="group.icon"></i>
                        <span>{{group.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <router-view class="count">

        </router-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                Index:0,
                list:[
                    {
                        "title":"推荐",
                        item:[
                            {"icon":"fa-music",path:"/navs/found","name":"发现音乐"},
                            {"icon":"fa-podcast",path:"/navs/fm","name":"私人音乐"},
                            {"icon":"fa-video-camera",path:"/navs/found1","name":"视频"},
                            {"icon":"fa-male",path:"/navs/found2","name":"朋友"}
                        ]
                    }
                ]
            }
        },
        methods:{
            toggle(index){
                console.log(index)
                this.Index = index
            }
        },
        created(){

        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .navs-tab{
        position: relative;
        display: flex;
        width: 100%;
        .tab{
            margin-top: 57px;
            width: 200px;
            background: @tab;
            height: 100%;
            position: fixed;
            .group{
                h3{
                    padding: 10px 10px;
                    font-size: 14px;
                    margin-left: 10px;
                }
                .item{
                    cursor: pointer;
                    color: #DCDDE3;
                    padding-left: 20px;
                    line-height: 3;
                    font-size: 13px;
                    position: relative;
                    .red{
                        position: absolute;
                        width: 3px;
                        height: 100%;
                        background: red;
                        left: 0;
                    }
                    &.router-link-active{
                        background: #26282C;
                        box-sizing: border-box;
                    }
                    i{
                        margin-right: 10px;
                        width: 15px;
                    }
                    &:nth-child(1){
                        background: #26282C;
                        padding-top: 0;
                    }
                }
            }

        }
        .count{
            margin-top: 57px;
            background: @cont;
            flex: 1;
            margin-left: 200px;
            padding: 0 25px;
        }
    }
</style>