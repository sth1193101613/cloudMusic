<template>
    <div class="mv">
        <h2 class="title"><span>推荐MV</span> <span @click="more">更多></span></h2>
        <ul class="mv-cont">
            <li v-for="(item,index) in list" class="mv-item" @mouseenter="enter(index)" @mouseleave="leave" v-if="index <3" @click="push(item)">
                <div class="container">
                    <transition name="fade">
                        <span class="counts" v-if="Index !== index"><i class="fa fa-music mus" aria-hidden="true"></i>{{item.playCount}}</span>
                    </transition>
                    <transition name="slide-fade">
                        <p class="copywriter" v-if="Index === index">{{item.copywriter}}</p>
                    </transition>
                    <img :src="item.picUrl">
                    <p class="name">{{item.name}}</p>
                    <span v-for="(group,iudex) in item.artists">
                        {{group.name}} <b v-if="item.artists.length !== 1">/</b>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from '../../../../../api/homePage'
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[],
                Index:null
            }
        },
        methods:{
            more(){
                this.$router.push({
                    path:'/navs/moreMv',
                })
            },
            push(item){
                this.$router.push({
                    path:'/navs/videoCont',
                    query:{
                        id:item.id
                    }
                })
            },
            enter(index){
                this.Index = index
            },
            leave(){
                this.Index = null
            },
            getMv(){
                headerModel.getMv().then((res) => {
                    this.list  = res.result
                })
            }
        },
        created() {
            this.getMv()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../../../assets/css/common";
    .mv{
        .title {
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #2b2b2b;
            padding-bottom: 10px;
            span{
                &:nth-child(2){
                    float: right;
                    font-size: 12px;
                    color: #828385;
                    cursor: pointer;
                }
            }
        }
        .mv-cont{
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-bottom: 20px;
            .mv-item{
                width: calc((100% / 3) - 8px);
                padding: 6px;
                &:nth-child(1),&:nth-child(3){
                    padding-left: 0;
                }
                .container{
                    position: relative;
                    .counts{
                        background-image: -webkit-linear-gradient(left, rgba(231, 51, 104, 0) 0%, #6d6969 100%);
                        position: absolute;
                        right: 0;
                        line-height: 2;
                        color: #fff;
                        font-size: 12px;
                        width: calc(150px / 2);
                        text-align: right;
                        padding-right: 7px;
                        .mus{
                            margin-right: 5px;
                        }
                    }
                    .copywriter{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        padding: 5px;
                        line-height: 1.5;
                        font-size: 12px;
                        color: #fff;
                        background: rgba(0,0,0,.5);
                        width: calc(100% - 10px);
                        position: absolute;
                        /*transform: translateY(-100%);*/
                        transition: .5s all;
                    }
                    img{
                        max-width: 100%;
                    }
                    .name{
                        color: #fff;
                        line-height: 2;
                        margin-top: 2px;
                        font-size: 12px;
                    }
                }

            }
        }
    }
</style>