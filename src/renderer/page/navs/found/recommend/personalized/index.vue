<template>
    <div class="personalized">
        <h2 class="title">推荐歌单</h2>
        <ul class="personalized-cont">
            <li v-for="(item,index) in list" class="personalized-item" @mouseenter="enter(index)" @mouseleave="leave" @click="push(item)">
                <div class="container">
                    <transition name="fade">
                        <span class="counts" v-if="Index !== index"><i class="fa fa-music mus" aria-hidden="true"></i>{{item.playCount | playCount}}</span>
                    </transition>
                    <transition name="slide-fade">
                        <p class="copywriter" v-if="Index === index">{{item.copywriter}}</p>
                    </transition>
                    <img :src="item.picUrl">
                    <p class="name">{{item.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { homePage } from '../../../../../api/homePage'
    let headerModel  = new homePage
    import {mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                list:[],
                Index:null,
                page:[]
            }
        },
        filters:{
            playCount(value){
                let val = parseInt(value)
                let str = String(val)
                if(str.length > 5){
                    return `${str.slice(0,str.length-5)}万`
                }else{
                    return str
                }
            },

        },
        methods:{
            ...mapMutations({
                getSongDetailId:'SONG_DETAILID'
            }),
            push(list){
                this.getSongDetailId(list.id)
                this.$router.push({
                    path:'/navs/myMusic'
                })
            },
            enter(index){
                this.Index = index
            },
            leave(){
                this.Index = null
            },
            Personalized(){
                headerModel.getPersonalized().then((res) => {
                    this.list = res.result
                })
            }
        },
        created(){
            this.Personalized()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../../../assets/css/common";
    .personalized{
        .title{
            color: #fff;
            border-bottom: 1px solid #4a4a4a;
            padding-bottom: 10px;
            font-size: 15px;
        }
        .personalized-cont{
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .personalized-item{
                width: calc((100% / 5) - 11px);
                padding: 6px;
                &:nth-child(1),&:nth-child(6){
                    padding-left: 0;
                }
                &:nth-child(5),&:nth-child(10){
                    padding-right: 0;
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
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                }

            }
        }
    }
</style>