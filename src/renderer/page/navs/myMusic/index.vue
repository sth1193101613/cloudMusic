<template>
    <div class="myMusic" style="padding: 0 0 50px 0;">
        <div class="music-head">
            <div class="bigImg">
                <img :src="list.coverImgUrl" alt="">
            </div>
            <div class="container">
                <ul v-if="list.creator" class="detail">
                    <li class="hetop">
                        <span class="red">歌单</span>
                        <span class="name">{{list.name}}</span>
                    </li>
                    <li class="info">
                        <img :src="list.creator.avatarUrl" alt="" class="avts">
                        <span class="nickname">{{list.creator.nickname}}</span>
                        <span class="createdtiem">{{list.createTime | setTime}}创建</span>
                    </li>
                    <li v-if="list.description">
                        <p class="desc">简介:{{list.description}}</p>
                    </li>
                </ul>
            </div>
            <div class="songtitle">
                <div class="songs">
                    <p class="title">歌曲数</p>
                    <p>{{list.trackCount}}</p>
                </div>
                <div>
                    <p class="title">播放数</p>
                    <p>{{list.playCount}}</p>
                </div>
            </div>
        </div>
        <div class="music-tab">
            <ul class="tab-menu">
                <li v-for="(item,index) in tab" @click="fnIndex(index,item.components)" class="music-li" :class="[{active:index === flag}]">
                    {{item.name}}
                </li>
            </ul>
            <keep-alive>
                <component :is="name" class="tabs_content" :list="list.tracks" @change="isLike" :subscribed="this.$route.query"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    let headModel = new homePage
    import Bus from '../../../Bus'
    import songlist from './songlist'
    import comment from './comment'
    import subscribers from './subscribers'
    export default {
        name: "index",
        data(){
            return{
                id:this.$route.query.id,
                list:[],
                flag:0,
                name:'v-songlist',
                tab:[
                    {"name":"歌曲列表","components":'songlist'},
                    {"name":"评论","components":'comment'},
                    {"name":"收藏者","components":'subscribers'}
                ]
            }
        },
        filters:{
            setTime(val){
                let time = new Date(val);
                let y = time.getFullYear();
                let m = time.getMonth()+1;
                let d = time.getDate();
                return `${y}-${m}-${d}`
            }
        },
        components:{
            "v-songlist" :songlist,
            "v-comment" :comment,
            "v-subscribers" :subscribers
        },
        methods:{
            fnIndex(index,data){
                this.flag = index;
                this.name = `v-${data}`;
            },
            _getSongDetail(){
                headModel.getSongDetail(this.id).then((res) => {
                    this.list = res.playlist
                })
            },
            isLike(){
                this._getSongDetail()
            },
        },
        activated() {
            Bus.$on('change',(cont) => {
                this.name = `v-${cont}`
                this.flag = 0
            })
            if(this.$route.name === 'myMusic') {
                this._getSongDetail()
            }
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .music-head{
        overflow: hidden;
        display: flex;
        padding: 25px 25px 0;
        .bigImg{
            width: 200px;
            height:200px;
            img{
                display: block;
                max-width: 100%;
            }
        }
        .container{
            flex: 1;
            padding: 0 20px;
            .hetop{
                display: flex;
                align-items: center;
                .red{
                    color: #E03F40;
                    border: 1px solid #E03F40;
                    padding: 1px 6px;
                    text-align: center;
                    border-radius: 3px;
                    margin-right: 5px;
                    width: 40px;
                }
                .name{
                    font-size: 22px;
                    color: #fff;
                    font-family: 微软雅黑;
                }
            }
            .info{
                margin-top: 15px;
                *{
                    vertical-align: middle;
                    display: inline-block;
                }
                .nickname{
                    padding: 0 10px;
                    font-size: 14px;
                }
                .createdtiem{
                    font-size: 12px;
                }
                .avts{
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }
            }
            .desc{
                color: #fff;
                font-size: 12px;
                margin-top: 12px;
                line-height: 1.5;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        }
        .songtitle{
            width: 150px;
            text-align: right;
            font-size: 12px;
            div{
                display: inline-block;
                vertical-align: middle;
                position: relative;
                padding: 0 10px;
            }
            .songs{
                .title{
                    padding-bottom: 2px;
                }
                &:after{
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    background: #23262C;
                    right: -4px;
                    top: 0;
                }
            }
        }
    }
    .music-tab{
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
